# pethome-owner（宠物主小程序）

宠物寄养洗护预约管理平台 · 宠物主端微信小程序（微信原生 + Vant Weapp）

## 技术栈

- 微信原生小程序（JS）
- Vant Weapp 组件库（`@vant/weapp`）
- tabBar 本地 PNG 图标（`images/tabbar/`）

## 已实现功能

- 微信登录：`wx.login` → 后端 `POST /api/auth/wx-login`（mock 模式自动注册）
- 首页：我的宠物卡片、推荐房型（房型图走 OSS 公共读）、服务入口
- 宠物档案：列表 / 新增 / 编辑 / 头像上传
- 寄养预约：房型选择 → 可订笼位 → 计价 → 下单 → 模拟支付
- 洗护预约：服务项目 / 美容师 / 日期 / 时段 → 下单 → 模拟支付
- 订单列表：寄养 + 洗护订单，点击订单查看照护动态
- 照护动态：每日喂食 / 遛弯 / 清洁 / 拍照记录与照片
- tabBar：首页 / 订单 / 我的（带图标）

## 目录

```
frontend-owner\
├── app.js / app.json / app.wxss
├── project.config.json       # 开发者工具配置（appid 当前为 touristappid）
├── sitemap.json
├── config\api.js             # 后端地址（默认 http://127.0.0.1:8080）
├── config\images.js          # 房型图片（OSS 公共读永久 URL）
├── utils\request.js / auth.js
└── pages\
    ├── index（首页）  orders（订单）  mine（我的）  login（登录）
    ├── pets（宠物列表）  pets\edit（宠物编辑）
    ├── boarding（寄养预约）  grooming（洗护预约）  care（照护动态）
```

## 运行

1. 微信开发者工具「导入项目」选择本目录；
2. 详情 → 本地设置 勾选「不校验合法域名」；
3. 启动后端（默认 8080）；
4. 微信登录在 `pethome.wx.mock-enabled=true` 时无需真实 AppID 即可跑通。

## 待办

- 接入真实微信 AppID / Secret（当前 mock 模式）
- 支付为模拟支付（真实支付见后端 `PaymentService` 网关抽象）
