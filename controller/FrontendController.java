package controller;

// 导入Spring MVC相关的注解和类
import org.springframework.web.bind.annotation.*;
// 导入服务层的集成服务
import service.IntegrationService;
// 导入数据传输对象
import dto.FrontendData;
import dto.ResultData;

/**
 * REST控制器，处理前端A的请求并与服务层交互
 * 提供两个API端点：/step1和/step2，分别对应处理前端数据的两个步骤
 */
@RestController  // 声明这是一个RESTful风格的控制器，会自动将返回值转换为JSON
@RequestMapping("/api")  // 所有请求路径的前缀
public class FrontendController {

    // 依赖注入集成服务，遵循依赖倒置原则
    private final IntegrationService integrationService;

    // 构造器注入，提高可测试性和松耦合
    public FrontendController(IntegrationService integrationService) {
        this.integrationService = integrationService;
    }

    /**
     * 处理前端的第一步请求
     * @param firstPartData 从前端接收的第一部分数据
     * @return 返回处理状态字符串
     */
    @PostMapping("/step1")  // 处理HTTP POST请求到/api/step1
    public String handleFirstStep(@RequestBody FrontendData firstPartData) {
        // 将请求数据传递给服务层处理，并返回处理结果
        return integrationService.processFirstStep(firstPartData);
    }

    /**
     * 处理前端的第二步请求
     * @param secondPartData 从前端接收的第二部分数据
     * @return 返回包含最终结果的ResultData对象
     */
    @PostMapping("/step2")  // 处理HTTP POST请求到/api/step2
    public ResultData handleSecondStep(@RequestBody FrontendData secondPartData) {
        // 将请求数据传递给服务层处理，并返回处理结果
        return integrationService.processSecondStep(secondPartData);
    }
}

