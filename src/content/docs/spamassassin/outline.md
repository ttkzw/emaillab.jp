---
title: SpamAssassinの概要
---

## SpamAssassinが提供するもの

SpamAssassinは次のものを提供しています。

- スパムらしさを判定するPerlのライブラリ
- ツール
- 標準のプラグイン
- 標準のルールファイル

### スパムらしさを判定するPerlのライブラリ

SpamAssassinをインストールするとMail::SpamAssassinモジュールがPerlのライブラリとしてインストールされます。Perlのスクリプトからこのモジュールを呼び出して使うことによりスパム判定などを行うことが出来ます。

使い方は簡単です。Perlのスクリプトを書ける人であれば簡単に使えるでしょう。

```perl
use Mail::SpamAssassin;
my $sa = Mail::SpamAssassin->new();
my $mail = $sa->parse($message);
my $status = $sa->check($mail);
if ($status->is_spam()) {
  $message = $status->rewrite_mail();
  ....
}
$status->finish();
$mail->finish();
```

### SpamAssassinのツール

次のツールが提供されます。

|ツール|説明|
|---|---|
|spamassassin|メールがスパムであるかどうかを判定するツール。|
|spamc|メールがスパムであるかどうかを判定するツール。spamdのクライアントとして動く。|
|spamd|メールがスパムであるかどうかを判定するデーモン。spamcをクライアントとして接続を受け付ける。|
|sa-learn|ベイズの学習を行わせるツール。|
|sa-update|最新のルールファイルをダウンロードしてきて更新するツール。|
|sa-compile|BODYルールをコンパイルするツール。|

### 標準のプラグイン

標準のプラグインには次のものがあります。

- 自動学習関連（AutoLearnThreshold、AWL）
- パターンテスト関連（WhitelistSubject、MIMEHeader、ReplaceTags）
- 国、言語関連（RelayCountry、TextCat）
- ネットワークテスト関連（DCC、Pyzor、Razor2、SpamCop、URIDNSBL）
- 送信者認証関連（SPF、DKIM、HashCash）
- その他（AccessDB、AntiVirus）


### 標準のルールファイル

標準で様々なルールが記述されたファイルがインストールされます。この標準のルールファイルを使うだけでもある程度のスパムの検出が出来ます。

## テストの種類

スパムらしさを判定するためにプラグインで行うことも含めて次のような様々な種類のテストを行っています。

- パターンテスト - ヘッダ、ボディのテキストパート、URI、メッセージ全体、ホワイトリスト・ブラックリスト
- 国、言語のテスト - メールが中継された国の一覧、テキストから言語の判断
- ネットワークテスト - IPアドレスやホスト名、DNSブラックリスト、URIDNSブラックリスト、協調型データベース、送信者認証（SPF, DomainKeys, DKIM）
- ベイズフィルタのテスト
- METAテスト


## 判定後の処理

メールがスパムであるかどうかを判定した結果として次の処理を行います。

- メールの書き換え - ヘッダの書き換え、スコアや判定結果のヘッダの追加、スパムメールのカプセル化（message/rfc822形式）
- 協調型データベース等への報告
- ベイズフィルタの学習
