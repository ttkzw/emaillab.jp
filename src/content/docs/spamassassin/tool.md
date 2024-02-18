---
title: SpamAssassin付属ツールの紹介
---
SpamAssassinが標準で提供しているツールを紹介します。

## spamassassin

spamassassinコマンドはMail::SpamAssassinモジュールのフロントエンドとなるPerlのスクリプトです。このコマンドにメールを渡してスパムらしさを判断できます。

SpamAssassinのtar ballにはスパムではないメールのサンプルsample-nonspam.txtとスパムメールのサンプルsample-spam.txtが含まれていますので、これを利用して試してみましょう。

spamassassinコマンドを使って次のように実行してください。

```sh
$ spamassassin < sample-spam.txt | less
X-Spam-Flag: YES
X-Spam-Checker-Version: SpamAssassin 3.1.8 (2007-02-13) on a.example.org
X-Spam-Level: **************************************************
X-Spam-Status: Yes, score=1002.5 required=5.0 tests=GTUBE,NO_RECEIVED,
        NO_RELAYS,RAZOR2_CF_RANGE_51_100,RAZOR2_CF_RANGE_E4_51_100,
        RAZOR2_CHECK autolearn=no version=3.1.8
X-Spam-Report:
        * -0.0 NO_RELAYS Informational: message was not relayed via SMTP
        * 1000 GTUBE BODY: Generic Test for Unsolicited Bulk Email
        * 1.5 RAZOR2_CF_RANGE_E4_51_100 Razor2 gives engine 4 level
        * confidence above 50%
        * [cf: 100]
        * 0.5 RAZOR2_CHECK Listed in Razor2 (http://razor.sf.net/)
        * 0.5 RAZOR2_CF_RANGE_51_100 Razor2 gives confidence level
        * above 50%
        * [cf: 100]
        * -0.0 NO_RECEIVED Informational: message has no Received headers
```

メールのスパムらしさの判定が行われ、`X-Spam-`で始まるヘッダーが挿入され、判定結果が表示されます。それぞれのヘッダーの意味は次のとおりです。

|ヘッダーフィールド|説明|
|---|---|
|X-Spam-Flag|スパムとして判定されたらこのヘッダーが挿入されます。|
|X-Spam-Checker-Version|SpamAssassinのバージョン表示が記述されます。|
|X-Spam-Level|スコアの分だけが*が追加されます。|
|X-Spam-Status|判定結果の要約が記述されます。|
|X-Spam-Report|スパムとして判定されたら、このヘッダーが挿入され、判定理由の詳細が記述されます。|

## spamd とspamc

メールを1通ごとにspamassassinコマンドでチェックしていたら毎回初期化のオーバーヘッドがかかります。そのため、たくさんのメールを効率よくチェックするためにデーモンとして動くspamdとCで書かれた軽量なクライアントのspamcというものが用意されています。

使い方としては、spamdをデーモンとして常駐させておき、spamcコマンドに標準入力からメールを与えます。spamcはUNIXドメインソケットあるいはTCP/IPネットワーク経由でspamdに接続して、メールのチェックを行わせます。

なお、spamdのrcスクリプトはソースコードのtar ballを展開したディレクトリのspamdディレクトリにあるので、プラットフォームに応じて利用してください。

## ベイズフィルタの学習sa-learn

ベイズフィルタはspam（スパムメール）とham（スパムではないメール）を標準ではそれぞれ200通以上学習しないとベイズフィルタのテストを行いません。ベイズフィルタの自動学習機能があるので、それぞれ学習するのを待つということも出来ますが、すでにスパムメールをたくさん持っているのであれば、sa-learnコマンドで強制的に学習させることができます。

次の例ではMaildir形式で溜め込んだスパムメールを学習させています。メールがたくさんある場合は`--progress`オプションを付けたほうが進捗を見ることができてよいでしょう。

```sh
$ sa-learn --spam --progress ./
1% [= ] 3.23 msgs/sec 09m34s LEFT
```

これと同じようなことをスパムではないメールについても`--ham`オプションを付けて学習させてください。

なお、ベイズのデータベースはユーザーごとに作成されることに注意してください。特にメールサーバーで一括して学習させている場合はSpamAssassinを呼び出しているプログラムを実行しているユーザーのデータベースに対して学習させる必要があることに注意してください。

## ルールファイルのアップデイト sa-update

私たちがスパム対策すると、スパムを送る側もその対策をすり抜けるようにスパムメールに工夫します。そのため、ルールファイルのメンテナンスを行わないと最新のスパムメールに対応できなくなります。

そのため、SpamAssassinはルールファイルを更新するsa-updateコマンドを用意しています。ウィルスやワームのように時間単位で新しいものが出てくるのとは違うので、1週間に1回程度、短くても1日に1回、実行すればよいです。

## BODYルールのコンパイルsa-compile

sa-compileはルールに記述された正規表現をあらかじめネイティブコードにコンパイルして、高速な判定を行えるようにするためのツールです。Rule2XSBodyプラグインを有効にすることによりコンパイルされたコードを利用できます。
ただし、UTF-8の文字はコンパイルの対象から除外されています。
