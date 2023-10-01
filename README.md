1.基本介紹Git
何謂git?
->Git 是分散式版本控制系統，這表示專案的本機複本是完整的版本控制存放庫。 這些功能完整的本機存放庫可讓您輕鬆地離線或遠端工作。 開發人員在本機認可其工作，然後同步處理其存放庫複本與伺服器上的複本。 此種模式與集中式版本控制不同

2.使用緣由
-> 當一個大案子 需要更新 修改 或者做到一半需要暫存 發展的時候 就需要 紀錄每次的修改 以及修改了什麼! 這樣往後修改錯了 可以直接回到之前之前 儲存的進度!

3.何為版本控制？版本控制系統是軟體，可協助追蹤一段時間程式碼中的變更。 當開發人員編輯程式碼時，版本控制系統會擷取檔案的快照集。 然後，它會永久儲存該快照集，以便稍後視需要重新叫用。 如果沒有版本控制，開發人員會想要在其電腦上保留多個程式碼複本

4.版本控制的邏輯說明
->軟體工程師常利用版本控制來跟蹤、維護原始碼、檔案以及設定檔等的改動
有時候，一個程式同時存有兩個以上的版本有其必要性，例如：發布版本中程式錯誤已經被修正，但沒有加入新功能；而開發版本則有新的功能正在開發、也有新的錯誤待解決，於是便需要同時維護兩個不同的版本
此外，為了找出只存在於某一特定版本中的程式錯誤、或找出程式錯誤出現的版本，開發人員也必須通過比對不同版本的原始碼以找出問題的位置

5.Git 常用指令集介紹&分支的使用方法&Commit 介紹及使用
移動指令 cd [路徑]
顯示目錄 ls
開新資料夾 mkdir [資料夾名稱]
查詢 Git 版本 git version
查看 Git 設置列表 git config --list
設置使用者姓名 git config --global user.name "姓名"
設置使用者 Email git config --global user.email "你的email"
查看 Git 狀態 git status
專案本地初始化 git init
遠端 Clone 專案 git clone [Url]
檔案加入索引 git add [檔案名稱]
全部檔案加入索引 git add .
將索引訊息加入並提交到數據庫 git commit -m '提交訊息'
顯示歷史訊息 git log
顯示所有分支 git branch
新增分支 git branch [分支名稱]
切換分支 git checkout [分支名稱]
刪除分支 git branch -D [分支名稱]
合併指定分支到目前分支 git merge [分支名稱]
遠端 Clone 專案並移動到特定目錄 git clone [Url] [目錄路徑] 
查詢遠端 repo git remote
本地分支上傳到遠端分支 git push 遠端repo 遠端分支名稱
遠端分支更新拉下來到本地合併 git pull
查詢標籤 git tag
查詢標籤詳細資訊 git tag -n
新增標籤 git tag [標籤名稱]
新增標籤備註 git tag -am [備註] [標籤名稱]
刪除標籤 git tag -d [標籤名稱]
暫時儲存目前目錄 git stash
顯示暫存列表 git stash list
還原暫存 git stash pop
清除最新一筆暫存 git stash drop
清除全部暫存 git stash clear

6..gitignore 配置
https://www.freecodecamp.org/chinese/news/gitignore-file-how-to-ignore-files-and-folders-in-git/

7.GitFlow 介紹
https://gitbook.tw/chapters/gitflow/why-need-git-flow
