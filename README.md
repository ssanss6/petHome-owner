# frontend-owner（宠物主小程序）

宠物主端微信小程序：**微信原生开发（JS）**，微信开发者工具直接打开即跑。

## 已实现

- 首页 `pages/index`（写死数据：banner / 服务入口 / 公告 / 热门推荐）
- 登录页 `pages/login`（微信登录：`wx.login` → 后端 `POST /api/auth/wx-login`）
- 请求封装 `utils/request.js`、登录态管理 `utils/auth.js`、接口地址 `config/api.js`

## 目录

```
frontend-owner\
├── app.js / app.json / app.wxss
├── project.config.json   # 开发者工具配置（appid 当前为 touristappid，可换成真实 appid）
├── sitemap.json
├── config\api.js         # 后端地址（默认 http://127.0.0.1:8080）
├── utils\request.js / auth.js
└── pages\index、pages\login
```

## 如何运行

1. 用微信开发者工具「导入项目」，选择本目录 `frontend-owner`；
2. 本地开发需在工具「详情 → 本地设置」勾选「不校验合法域名」；
3. 后端地址见 `config/api.js`（默认 `http://127.0.0.1:8080`）；
4. 后端需已启动（`/api/auth/wx-login` 在 `pethome.wx.mock-enabled=true` 时无需真实 AppID 即可跑通登录链路）。

## 待办

- 接入真实微信 AppID/Secret（当前 mock 模式）
- 服务入口点击跳转到对应业务页（寄养/洗护等，M3+ 实现）
