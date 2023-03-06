# 置物櫃後台系統

## Repo

- front：[https://github.com/monosparta/luck-cms](https://github.com/leonnn124/luck-cms)
- back：[https://github.com/monosparta/MonoLuck-CMS-Back](https://github.com/monosparta/MonoLuck-CMS-Back)

## User Story

作為 Monoluck 的管理者
我希望可以看到那些鎖櫃已經被登記使用，在分配新會員的置物櫃上會更加方便

作為 Monoluck 的管理者
我想要能快速解決會員卡號更改的問題，有個後台系統讓我操作

作為 Monoluck 的管理者
我想要可以透過這個系統直接進行開鎖(特殊情況下)

作為 Monoluck 的管理者
紀錄開鎖紀錄(時間與原因)，保障使用者權益

作為 Monoluck 的使用者
我想查看鎖櫃開鎖紀錄

## 功能

- 管理者可以看到所有鎖櫃狀態:被誰登記使用，未被登記使用
- 管理者可以更改鎖櫃對應的卡號
- 供管理者用系統開鎖
- 紀錄鎖櫃開啟的時間、開啟的人，並可手動輸入工作人員開啟原因開啟
- 使用者可以查看鎖櫃開鎖紀錄

## 系統需求

- 資訊需求
  - 鎖櫃資料

- 硬體需求
  - 磁卡感應器
  - 樹莓派
  - 樹莓派電子鎖

- 軟體需求
  - React
  - laravel
  - mqtt broker server
    [參考資料](http://www.steves-internet-guide.com/mosquitto-broker/)
  - python
  - MySQL

## 實作方法

- 使用React開發系統網頁為管理者與使用者提供服務
- 使用laravel開發功能需要的相關API，如:管理者開鎖，更改卡號，更改開鎖紀錄的描述
- 改寫現有的置物櫃開鎖程式(python)，將目前把cardId與鎖櫃寫死的狀況，改為呼叫API存取MySQL資料庫。
- 在置物櫃開鎖程式用Socket等待管理員呼叫開鎖

## 進行方式

- 以敏捷開發模式進行開發
- 時程:
  - Week 1 (4/4~4/8)
    - Wireframe
    - Mockup
    - 規劃ER-Model
    - 架設mysql資料庫+假資料
  - Week 2 (4/11~4/15)
    - 鎖櫃頁面
    - 鎖櫃詳細內容頁面
    - 完成更改卡號API
    - 登入介面sample
    - 研究登入系統
  - Week 3 (4/18~4/22)
    - 聊天室頁面
    - 完成登入系統
  - Week 4 (4/25~4/29)
    - 用卡號查鎖櫃實體編碼API
    - 改寫樹莓派開鎖程式(接API)

## 預期達成目標

- 管理員能進系統幫會員更改卡號
- 管理員可以從系統得知哪些鎖櫃已被登記過
- 管理員擁有權利在特殊情況下強制開啟會員的鎖櫃
- 管理員可以查看鎖櫃被使用的紀錄

## API
-登入
-登出
- 會員逼卡開鎖(卡號查詢置物櫃，同時記錄下來)
- 查詢置所有物櫃使用狀態
- 管理員用系統開鎖(同時記錄下來)
- 更改使用者資料
- 新增使用者資料

## 4/20進度報告建議
1. 電話號碼建議用國碼格式儲存
2. 不要有需要滾動的頁面(鎖櫃介面)
3. 強制開鎖後建議將強制開鎖的紀錄立即顯示到畫面上
123