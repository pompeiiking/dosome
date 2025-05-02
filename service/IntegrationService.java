package service;

import dto.FrontendData;
import dto.DatabaseData;
import dto.ResultData;
import repository.DatabaseRepository;
import algorithm.AlgorithmC;
import org.springframework.stereotype.Service;

@Service
public class IntegrationService {

    private final DatabaseRepository databaseRepository;
    private final AlgorithmC algorithmC;
    private FrontendData cachedFirstPartData;
    private DatabaseData cachedFirstDbData;

    public IntegrationService(DatabaseRepository databaseRepository, AlgorithmC algorithmC) {
        this.databaseRepository = databaseRepository;
        this.algorithmC = algorithmC;
    }

    public String processFirstStep(FrontendData firstPartData) {
        // 保存前端第一部分信息
        this.cachedFirstPartData = firstPartData;
        
        // 从数据库获取相关数据
        DatabaseData firstDbData = databaseRepository.fetchData(firstPartData.getRelatedKey());
        this.cachedFirstDbData = firstDbData;
        
        // 将两份信息传给算法C
        ResultData intermediateResult = algorithmC.calculate(firstPartData, firstDbData);
        
        // 返回中间结果或状态
        return intermediateResult.getStatus();
    }

    public ResultData processSecondStep(FrontendData secondPartData) {
        // 获取数据库中另一部分相关信息
        DatabaseData secondDbData = databaseRepository.fetchAdditionalData(secondPartData.getRelatedKey());
        
        // 结合之前缓存的数据和新数据，一起传给算法C
        ResultData finalResult = algorithmC.calculateFinal(
            cachedFirstPartData, cachedFirstDbData, secondPartData, secondDbData);
        
        return finalResult;
    }
}    

