package com.ciallo.travelbackend;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.RecommendationResponse;
import com.ciallo.travelbackend.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin
public class RecommendController {
    @Autowired
    private TravelService travelService;

    /**
     * 推荐接口，接收小程序前端POST的JSON数据
     * @param input 前端传来的请求体（JSON对象，内容可自定义）
     * @return 返回预设的推荐内容（可根据实际需求修改）
     *
     * 数据传输方式：
     * 1. 前端通过HTTP POST方式，向 /api/travel/recommend 发送JSON数据（如用户填写的表单等）。
     * 2. 后端用@RequestBody UserInput input接收前端传来的所有字段。
     * 3. 后端处理后，将结果以JSON格式返回给前端。
     * 4. 前端收到后端返回内容后，直接显示在页面上（如result页面的textarea）。
     *
     * 如何修改/编辑数据：
     * - 你可以在本方法内编辑或处理数据。例如：
     *   1. 解析input参数，提取用户输入内容。
     *   2. 调用算法或业务逻辑生成推荐内容。
     *   3. 修改testData部分，返回你想要的结构和内容。
     *   4. 也可以将input内容直接返回，便于前端调试。
     *
     * 前端最终获取到的数据：
     * - 是本方法返回的response对象，结构如下：
     *   {
     *     code: 0, // 状态码，0为成功
     *     msg: "推荐成功", // 提示信息
     *     data: { // 推荐内容（可自定义）
     *       paths: [...],
     *       msg: "测试返回，后端已收到请求"
     *     }
     *   }
     * - 前端会将整个返回内容以JSON文本显示在页面上。
     */
    @PostMapping("/recommend")
    public RecommendationResponse recommend(@RequestBody UserInput input) {
        System.out.println("收到前端请求: " + input);
        return travelService.recommend(input);
    }
} 