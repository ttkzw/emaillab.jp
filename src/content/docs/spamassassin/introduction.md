---
title: SpamAssassinの紹介
sidebar:
    order: 1
---
## SpamAssassinとは

SpamAssassinは様々なテストを行ってスパムらしさを判定するメールフィルタです。

スパムらしさを判定するテストにはテキスト分析、ベイズフィルタ、DNSブラックリスト、協調型データベースなどを使います。

様々なテストの結果をスパムらしさのスコアとして加算していくため、正常なメールをスパムと誤判定することがが少なくなります。

さらに、プラグインで様々なテストを追加できます。例えば、画像スパムに対してはOCR技術を使ったテストを行うものが外部のプラグインとして開発されています。

なお、SpamAssassinはApache Software Foundationの基に開発が行われています。

## 出来ることと出来ないこと

よく勘違いされますが、SpamAssassin単体ではスパムを除去したり、振り分けした、バウンスメールを送ったりはできません。SpamAssassinが行うのはスパムらしさのスコアを付け、判定して、ヘッダに情報を追加したり、書き換えたりすることくらいです。

スパムの除去や振り分けなどを行いたい場合は、サーバとしてはamavisd-newなど、クライアントとしてはprocmailやmaildropなどの他のソフトウェアと組み合わせて使います。

## 動作環境

SpamAssassin 3.3.0からはPerl 5.6.*のサポートは廃止されました。
Perl 5.8.8, 5.8.9, 5.10.1以降が推奨されます。
ただし、FreeBSDではPerl 5.10.0以前のマルチスレッド対応バージョンは避けてください。
なお、SpamAssassin 3.3.1の時点ではPerl 5.12ではうまくビルドできないようです。

## SpamAssassinに対する評価

### InfoWorld BOSSIE Awards 2007

InfoWorld BOSSIE Awards 2007の"Best of open source in security"部門の"anti-spam"製品の勝者としてSpamAssassinが選ばれました。

### Linux New Media Awards 2006

Linux Magazineを発行しているLINUX NEW MEDIAが主催したLinux New Media Awards 2006のBest Linux-based Anti-spam Solution部門でSpamAssassinは2位以下を大きく引き離して1位を獲得しました。

### Datamation Product of the Year 2006 Awards

米国IT誌Datamationが主催するProduct of the Year 2006 Awardsのアンチスパムカテゴリにおいて、受賞候補として商用製品があがっている中でオープンソースソフトウェアのSpamAssassinが受賞しました。

## 日本語対応

SpamAssassin 3.4.2に対する日本語対応状況は次のサイトをご覧ください。

- [SpamAssassinの日本語対応状況](https://heartbeats.jp/hbblog/2018/10/spamassassin.html)

なお、SpamAssassin 3.4.2に対する日本語パッチは滝澤がハードビーツに所属しているときに開発したものです。現在はハートビーツを退職しているため、このパッチについてハートビーツに問い合わせないようにしてください。

