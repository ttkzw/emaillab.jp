---
title: SpamAssassinのルールの書き方
sidebar:
    order: 7
---
## 設定ファイル

### 設定ファイルの種類

標準では次の表のような設定ファイルが読み込まれます。

||設定ファイル|説明|
|---|---|---|
|1|/etc/mail/spamassassin/*.pre|サイトのプラグイン制御ファイル|
|2|/var/lib/spamassassin/VERSION/*.pre|デフォルトのプラグイン制御ファイル|
|3|/var/lib/spamassassin/VERSION/*.cf|デフォルトのルールファイル|
|4|/etc/mail/spamassassin/*.cf|サイトのルールファイル|
|5|$HOME/.spamassassin/user_prefs|ユーザのルールファイル|

ここでVERSIONには3.003001のようなバージョン番号が入ります。

また、設定ファイル中にincludeオプションを使うことで別の設定ファイルを読み込ませることもできます。

### 読み込む順番

ファイルを読み込む順番は表の数字の順番通りです。同じオプションやルールがある場合は後から読み込まれたものが上書きします。

includeオプションを使った場合は、全てのファイルが読み込まれた後に指定されたファイルが指定元の設定ファイルの順番で読み込まれます。

## テストルールの書き方

### パターンテスト

パターンテストに次の表のものがあります。

|対象|説明|
|---|---|
|header|ヘッダ（MIME復号化済み）|
|body|ボディのテキストパートのみ（MIME復号化済み、HTMLタグ等の除去あり）|
|uri|ボディに記述されたURI|
|rawbody|ボディのテキストパートのみ（MIME復号化済み）|
|full|生メッセージ全体（MIME復号化なし）|

header以外のテストについては次のような形式のルールを記述します。

```
body  テスト名 /パターン/修飾子
```

パターンはPerl正規表現を使うことができます。ボディに"spam"という単語を含むかどうかをテストしたい場合は次のように記述します。

```
body SPAM /\bspam\b/i
```

headerテストについては次のような形式のルールを記述します。

```
header テスト名 ヘッダ名 op /パターン/修飾子
```

opはマッチすることを意味する"=~"かマッチしないことを意味する"!~"です。Subjectヘッダが"spam"という単語を含むかどうかをテストしたい場合は次のように記述します。

```
header SUBJECT_SPAM Subject =~ /\bspam\b/i
```

さらに、ヘッダ名に":"で始まる次の表のようなクエリーを付けることによりパターンテストの対象を変えることができます。

|クエリー|説明|
|---|---|
|クエリーなし|MIME復号化済み|
|:raw|MIME復号化なし（生の状態）|
|:addr|メールアドレス|
|:name|名前|

例えば、SubjectヘッダがQエンコードされているかどうかをテストしたい場合は次のように記述します。

```
header SUBJ_Q_ENCODE Subject:raw =~ /=\?\S+\?Q\?/i
```

headerテストにはさらに次のような形式のテストもあります。

```
header テスト名 exists:ヘッダ名
```

これは、ヘッダ名のヘッダが存在するかを調べるテストです。例えば、Subjectヘッダがあるかどうかをテストしたい場合は次のように記述します。

```
header HAS_SUBJECT exists:Subject
```

### metaテスト

metaテストでは複数のテスト結果を組み合わせて評価することができます。次のような形式のルールを記述します。

```
meta テスト名 ブール演算式
```

ブール演算式には論理積"&&"、論理和"||"、否定"!"、括弧()を使うことができます。

例えば、メーリングリスト用のヘッダがあるかどうかをテストする場合は次のように記述します。

```
header __LIST_ID List-Id =~ /\./
header __X_ML_NAME exists:X-ML-Name
header __MAILING_LIST exists:Mailing-List
meta MAILING_LIST __LIST_ID || __X_ML_NAME || __MAILING_LIST
```

なお、"`__`"（アンダースコア2個）で始まるテスト名は単体ではスコアに加算しません。metaテストのサブテストとして用いられます。

### パターンテストの注意事項

SpamAssassinはパターンテストのパターンを実行時にほぼそのまま評価しています。そのため、Perlにおいて処理時間がかかるパターンはパターンテストにおいても同様に処理時間がかかります。そのため、筆者がルールを記述するときに気をつけている注意点をいくつか紹介します。

- fullテストを使わない。
- bodyテストにおいて`/.*/`のような行末までマッチするようなパターンを使わない。
- グループ化するときは後方参照しないように `(?:...)` 構文を使う。
- `(A|B)`のような1文字の選択であれば`[AB]` のように集合にする。ただし、日本語の場合はこの方法は使えない。

### 説明とスコア

SpamAssassinの判定結果をヘッダに付与すると、スパムと判定されたときにはX-Spam-Reportというヘッダが追加されます。

```
X-Spam-Report: 
        * 0.0 HS_INDEX_PARAM URI: Link contains a common tracker pattern.
        * 1.0 URIBL_WS_SURBL Contains an URL listed in the WS SURBL blocklist
        * [URIs: melkko.net]
        * 1.0 MISSING_MSGID Missing Message-Id: header
```

このヘッダの値にはテストのスコア、テスト名、説明が記述されます。
このときの説明はdescribeを使ってテストのルールの後に次の形式で記述します。

```
describe テスト名 説明
```

スコアはscoreを使って次の形式で設定します。

```
score テスト名 スコア
```

例えば、先ほど説明したメーリングリストのテスト名MAILING_LISTに対する説明とスコアを記述するには次のようにします。

```
describe MAILING_LIST Contains header for Mailing List.
score MAILING_LIST 1.0
```

### プラグイン用のルールの記述

プラグイン用の設定オプションやルールを記述する場合は次のようにifpluginオプションを使ってください。このようにするとプラグインの使用を一時的に止めたときにも問題が生じません。

```
ifplugin プラグインモジュール名
# この行の間に設定オプションやルールを記述
endif
```

例えば、 AutoLearnThreshold プラグイン用のルールを記述する場合は次のように記述します。

```
ifplugin Mail::SpamAssassin::Plugin::AutoLearnThreshold
bayes_auto_learn_threshold_nonspam 1.0
bayes_auto_learn_threshold_spam 12.0
endif # Mail::SpamAssassin::Plugin::AutoLearnThreshold
```

## スコア

SpamAssassinのデフォルトのルールのスコアの設定の40～50%は1点以下で、90%は3点以下です。ブラックリスト等の特殊なものを除くとほとんどが4点未満になります。これは小さなスパムらしさの積み上げでスパムであるかどうかを判断しているというSpamAssassinの特徴を表しています。そのため、スコアを設定するときにはデフォルトのルールのスコアとのバランスを考えてください。確実にスパムであると判定できるルールではない場合はスコアを3点以下にするのがよいでしょう。

## 設定ファイルの検証

設定ファイル等を変更した場合は、必ず次のコマンドを実行してください。

```sh
$ spamassassin --lint
```

何も出力がなければ問題はないです。設定ファイルの記述に間違いがある場合はエラーが出ます。
