---
title: ドメイン名の歴史
sidebar:
    order: 4
---

本記事ではドメイン名ができるまでの歴史についてまとめたものになります。

なお、筆者自身はインターネットの原型であるARPANETや80年代のインターネットをリアルタイムには体験してはいないため、[RFC（Request for Comments）](https://ja.wikipedia.org/wiki/Request_for_Comments)やインターネット上にある当時のホストのアーカイブを元に調査した内容をまとめたものになります。

## ARPANETの時代

1969年から1980年代初期にかけてのインターネットの原型となったARPANETでのホスト名について紹介します。

時代背景を簡単に説明します。
1969年にARPANETの運用が始まりました。
ARPANETでは当初はNCPというプロトコルが使われていました。TCP/IPへ移行したのは1982年から1983年にかけてです。
この当時は（専用機ではないという意味での）汎用的なコンピューターとしてはメインフレーム（IBM System/360シリーズ、他）やミニコンピューター（DEC PDPシリーズ、他）が主流でした。これらのコンピューターがARPANETには接続されていました。
パソコンは1970年代後半に登場しましたが、まだホビー向けでした。

### ホストリストの標準化

ARPANETで使われていたNCPというプロトコルではホストアドレスの表記はIPv4の“192.0.2.1”のような形式ではなく、“1”や“2”のような番号がそのまま使われていました。
このような数字のホストアドレスは覚えにくいため、必然的にホストアドレスに対するホスト名を付けるようになりました。各組織がそれぞれ勝手に付けていたため、1971年9月に標準化しようという提案が行われました。それが『[RFC 226 STANDARDIZATION OF HOST MNEUMONICS](https://datatracker.ietf.org/doc/html/rfc226)』です。

- [RFC 226 STANDARDIZATION OF HOST MNEUMONICS](https://datatracker.ietf.org/doc/html/rfc226)（1971年9月20日）

この提案に対して、次のような様々なコメントがARPANETの文書の[RFC（Request for Comments）](https://ja.wikipedia.org/wiki/Request_for_Comments)として公開されました。ちなみに、この時代にはまだ今のようなインターネット標準を定める仕組みは確立されておらず、“Request For Comments”の文字通りにコメントを募集していました。

- [RFC 229 STANDARD HOST NAMES](https://datatracker.ietf.org/doc/html/rfc229)（1971年9月22日）
- [RFC 233 Standardization of Host Call Letters](https://datatracker.ietf.org/doc/html/rfc233)（1971年9月28日）
- [RFC 236 STANDARD HOST NAMES](https://datatracker.ietf.org/doc/html/rfc236)（1971年9月27日）
- [RFC 239 HOST MNEMONICS PROPOSED IN RFC #226](https://datatracker.ietf.org/doc/html/rfc239)（1971年9月23日）
- [RFC 247 Proferred Set of Standard Host Names](https://datatracker.ietf.org/doc/html/rfc247)（1971年10月12日）

これらに対して、NIC（Network Information Center、ネットワーク インフォメーション センター）は以下のようなとりまとめを行っていきました。

- [RFC 237 The Nic's View of Standard Host Names](https://datatracker.ietf.org/doc/html/rfc237)（1971年10月5日）
- [RFC 273 MORE ON STANDARD HOST NAMES](https://datatracker.ietf.org/doc/html/rfc273)（1971年10月18日）
- [RFC 280 A Draft Set of Host Names](https://datatracker.ietf.org/doc/html/rfc280)（1971年11月17日）
- [RFC 289 What We Hope Is An Official List of Host Names](https://datatracker.ietf.org/doc/html/rfc289)（1971年12月21日）

最終的に1972年8月に『[RFC 384 OFFICIAL SITE IDENTS FOR ORGANIZATIONS IN THE ARPA NETWORK](https://datatracker.ietf.org/doc/html/rfc384)』が公開されました。

- [RFC 384 OFFICIAL SITE IDENTS FOR ORGANIZATIONS IN THE ARPA NETWORK](https://datatracker.ietf.org/doc/html/rfc384)（1972年8月28日）

次のように“UCLA-NMC”や“SRI-ARC”というホスト名があることを確認できます。

```
Site Ident           Address           Organization

UCLA-NMC                 1     University of California at Los Angeles,
                               Network Measurement Center
SRI-ARC                  2     Stanford Research Institute
                               Augmentation Research Center
```

このときのホスト名は『[RFC 273 MORE ON STANDARD HOST NAMES](https://datatracker.ietf.org/doc/html/rfc273)』に基づき、「&lt;組織のニーモニック&gt;-&lt;ホストのニーモニック&gt;」の形式になりました。

このホストリストにおいて、“UCLA-NMC”はUCLA（カリフォルニア大学ロサンゼルス校）のNetwork Measurement Centerにあるホストのホスト名、“SRI-ARC”はSRI（スタンフォード研究所）のAugmentation Research Centerにあるホストのホスト名であり、それぞれARPANETの1番目と2番目のノードです。このホストリストには全部の70個のホストが登録されています。

ちなみに、SRI（スタンフォード研究所、後のSRIインターナショナル）がARPANETのNIC（ネットワーク インフォメーション センター）を運用していました。
本記事の中盤からホスト名SRI-NICのホストが登場しますが、これはこのSRIが運用しているNICのホストのことを示しています。

### ホストリストの更新

『[RFC 384 OFFICIAL SITE IDENTS FOR ORGANIZATIONS IN THE ARPA NETWORK](https://datatracker.ietf.org/doc/html/rfc384)』が公開されてから、しばらくはRFCでのホストリストの更新がなかったため、各組織が独自にそのリストを保守することになりました。

[RFC 384](https://datatracker.ietf.org/doc/html/rfc384)から1年4か月経過した1973年12月に『[RFC 597 Host Status](https://datatracker.ietf.org/doc/html/rfc597)』が公開され、ホストリストが更新されました。

- [RFC 597 Host Status](https://datatracker.ietf.org/doc/html/rfc597)（1973年12月12日）

ホストリストは次のような形式になりました。[RFC 384](https://datatracker.ietf.org/doc/html/rfc384)に比べて、コンピューターやシステムの情報が加えられました。ちなみに、90個のホストが登録されています。

```
Host   Address  Hostname        (Interface)->   Status/
(8)     (10)                    Computer        System
 -----------------------------------------------------------------
  1     001     UCLA-NMC        Sigma 7         Server till 12/31/73
                                                SEX
                                PDP-11/45       User 1/1/74
                                                ANTS

101      65     UCLA-CCn        IBM 360/91      Server

201     129     UCLA-CCBS       (PDP-15)->      limited Server
                                PDP-10

002     2       SRI-ARC         PDP-10          dedicated Server
                                                TENEX, NLS
```

参考情報として、この当時（1974年1月）のホストリストの印刷物の一部をスキャンしてPDF化したものがあります。

- [ARPANET DIRECTORY NIC 19285 - HOST NAMES](https://github.com/ttkzw/hosts.txt/blob/master/pub/hosts/1974/host_names_1974.pdf)（1974年1月）

これは、2008年1月に[Internet Historyメーリングリスト](https://elists.isoc.org/pipermail/internet-history/2008-January/date.html)に投稿されものです。

### HOSTS.TXTの誕生

1973年12月にホストリストの保守に関して『[RFC 606 Host Names On-line](https://datatracker.ietf.org/doc/html/rfc606)』という提案が行われました。NICにより集中的にホストリストを管理し、オンライン上にファイルを置いて、そのファイルを機械的に処理できる形式にしようという提案です。

- [RFC 606 Host Names On-line](https://datatracker.ietf.org/doc/html/rfc606)（1973年12月）

これを受けて、NICは『[RFC 608 HOST NAMES ON-LINE](https://datatracker.ietf.org/doc/html/rfc608)』を公開し、NICにより作成するホストリストの形式の仕様とそのホストリストのファイル（HOSTS.TXT）にFTPアクセスできる仕組みを設けることを提案しました。

- [RFC 608 HOST NAMES ON-LINE](https://datatracker.ietf.org/doc/html/rfc608)（1974年1月10日）

このRFCにおけるホスト名の規則は次の通りです。

- 英文字（A-Z）と数字（0-9）とマイナス（-）から構成される48文字までの文字列
- 大文字と小文字を区別しない
- 最初の文字は英文字である
- 最後の文字にはマイナスは使えない

さらに、1974年3月に『[RFC 627 ASCII TEXT FILE OF HOSTNAMES](https://datatracker.ietf.org/doc/html/rfc627)』によりホスト名OFFICE-1のホスト上でHOSTS.TXTファイルを公開したことが告知されました。

- [RFC 627 ASCII TEXT FILE OF HOSTNAMES](https://datatracker.ietf.org/doc/html/rfc627)（1974年3月25日）

これ以降はNICによるホスト名リストの集中管理が行われるようになりました。

管理のサイクルは以下のようになりました。

1. 各組織はホストを登録するときにNICに申請する。
2. NICは各組織から申請があった内容をHOSTS.TXTに反映させる。
3. 各組織のホストはホストOFFICE-1からHOSTS.TXTをFTPで取得して利用する。

筆者はこの当時のHOSTS.TXTファイルを入手できていないため、実際にはどのように記述されていたかはわかりません。

### TCP/IPへの移行

1982年から1983年にかけてNCPからTCP/IPへの移行が行われました。
1982年3月にHOSTS.TXTもARPANETとインターネットの両方に対応できるようにした『[RFC 810 DoD INTERNET HOST TABLE SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc810)』が公開されました。

- [RFC 810 DoD INTERNET HOST TABLE SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc810)（1982年3月1日）

この新しい形式のHOSTS.TXTファイルはホスト名SRI-NICのホストで公開されました。

このRFCにおけるホスト名の規則は次の通りです。

- 英文字（A-Z）と数字（0-9）とマイナス（-）とピリオド（.）で構成される24文字までの文字列
- 大文字と小文字を区別しない
- 最初の文字は英文字である
- 最後の文字はマイナスとピリオドは使えない

次のような例が示されています。

```
EXAMPLE OF NEW HOST TABLE FORMAT

   NET : 10.0.0.0 : ARPANET :
   NET : 18.0.0.0 : LCSNET :
   GATEWAY : 10.0.0.77, 18.8.0.4 : MIT-GW :: MOS : IP/GW :
   HOST : 10.0.0.73 : SRI-NIC,NIC : FOONLY-F3 : TENEX :
       NCP/TELNET,NCP/FTP, TCP/TELNET, TCP/FTP :
   HOST: 10.2.0.11 : SU-TIP,FELT-TIP :::
```

この時代以降のHOSTS.TXTファイルは当時のホストのアーカイブを公開しているサイトから見つかるようになりました。筆者が収集したものは『[HOSTS.TXT](https://emaillab.jp/dns/hosts/)』で公開しています。
ここでは収集したもののいくつかを紹介します。ただし、NICで配布されたオリジナルのコピーというわけではなく、利用する組織により編集され、ネットワークやホストの追加が行われていたようです。

次のファイルは1983年1月19日のHOSTS.TXTです。

- [HOSTS.TXT](https://github.com/ttkzw/hosts.txt/blob/master/pub/hosts/19830119/HOSTS.TXT)

ホストSRI-NICについては以下のように記述されています。ホストアドレスはNCPのアドレスで記述されており、まだIPアドレスに移行していないのがわかります。

```
HOST SRI-NIC,           0/73,SERVER,TENEX,PDP10,[NIC,SRI-F3]
```

次のファイルは1983年5月27日のHOSTS.TXTです。

- [HOSTS.TXT](https://github.com/ttkzw/hosts.txt/blob/master/pub/hosts/19830527/HOSTS.TXT)

ホストSRI-NICについては以下のように記述されています。IPアドレスに移行したことがわかります。

```
HOST : 10.0.0.73 : SRI-NIC,NIC : FOONLY-F3 : TENEX : TCP/TELNET,TCP/SMTP,TCP/TIME,TCP/FTP,NCP/FTP,NCP/TELNET :;Reclama
```

## ドメイン名への移行

ここからはドメイン名の成り立ちについて紹介します。

時代背景を簡単に説明します。
1983年から1984年にARPANETからアメリカ合衆国国防総省の実務ネットワークとしてMILNETが[分離](https://www.rfc-editor.org/rfc/museum/ddn-news/ddn-news.n26.1)しました。
さらに、NSFNET（全米科学財団ネットワーク）を含めた様々なネットワークが接続していき、ネットワークのネットワークとしてインターネットになっていきました。
1990年にはARPANETが正式に停止しました。

### ドメイン名のアイデアの登場

1981年から1982年にかけて次のRFCが提案され、ドメイン名のアイデアが登場します。

- [RFC 799 Internet Name Domains](https://datatracker.ietf.org/doc/html/rfc799)（1981年9月）
- [RFC 805 Computer Mail Meeting Notes](https://datatracker.ietf.org/doc/html/rfc805)（1982年2月8日）
- [RFC 819 The Domain Naming Convention for Internet User Applications](https://datatracker.ietf.org/doc/html/rfc819)（1982年8月）
- [RFC 830 A Distributed System for Internet Name Service](https://datatracker.ietf.org/doc/html/rfc830)（1982年10月）

特にザウ・シン・スー氏とジョン・ポステル氏が著者である『[RFC 819 The Domain Naming Convention for Internet User Applications](https://datatracker.ietf.org/doc/html/rfc819)』の「5. Name Service」のセクションにはHOSTS.TXTによる集中管理の問題点の整理と現在のDNSに通じる名前解決のアイデアも記述されています。

### DNSの仕様の提案

1983年11月に現在のDNSの仕様の元になる次のRFCがポール・モカペトリス氏により提案されました。

- [RFC 882 DOMAIN NAMES - CONCEPTS and FACILITIES](https://datatracker.ietf.org/doc/html/rfc882)（1983年11月）
- [RFC 883 DOMAIN NAMES - IMPLEMENTATION and SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc883)（1983年11月）

『[RFC 882 DOMAIN NAMES - CONCEPTS and FACILITIES](https://datatracker.ietf.org/doc/html/rfc882)』では、まずドメイン名が必要な理由が述べられています。

- アプリケーションが様々なリソースの場所を参照するのが難しいこと
- 集中管理しているホストテーブルHOSTS.TXTファイルのサイズと更新頻度が管理の限界に近いこと
- メールの配送先の場所を特定するのが難しいこと

HOSTS.TXTファイルの問題について、2つのグラフを紹介します。これらは筆者が収集している『[HOSTS.TXT](https://emaillab.jp/dns/hosts/)』コレクションから作成しました。

次のグラフはHOSTS.TXTファイルに登録されているホストやネットワークの数の1983年から1988年までの推移を示したものです。

![HOSTS.TXTの数の推移](/dns/domainname/images/hosts-txt.png)

約500台だったホストが約8000台になっています。
すでにDNSに移行した1989年の状況については、Computer History Museumの『[Internet History Of 1980s](https://www.computerhistory.org/internethistory/1980s/)』によると、1月には8万台、7月には13万台、11月には16万台のホストがインターネットにつながり、加速度的に増加していました。

さらに、次のグラフはファイルサイズを示したものです。

![HOSTS.TXTのファイルサイズの推移](/dns/domainname/images/filesize.png)

1983年には約50KiBだったものが1988年には約760KiBまで増えました。このファイルを多数のホストが取得することを考えると、当時のネットワーク回線の帯域にとってはとても大きなサイズです。
当時のネットワーク回線帯域の例として、『[Internet History Of 1980s](https://www.computerhistory.org/internethistory/1980s/)』によると1986年当時のNSFNET（全米科学財団ネットワーク）のバックボーンの帯域は56Kbpsでした。ただし、これは1987年から1988年にかけてT1（約1.5Mbps）に置き換えられました。
さらに、アクセス回線周りの話をすると、モデムの速度は300bps〜2400bpsの時代でした。


### ドメイン名への移行

1983年11月にジョン・ポステル氏によりドメイン名への移行計画とスケジュールが『[RFC 881 The Domain Names Plan and Schedule](https://datatracker.ietf.org/doc/html/rfc881)』として提案されました。

- [RFC 881 The Domain Names Plan and Schedule](https://datatracker.ietf.org/doc/html/rfc881)（1983年11月）

この提案のスケジュールは次のRFCにより更新されました。

- [RFC 897 Domain Name System Implementation Schedule](https://datatracker.ietf.org/doc/html/rfc897)（1984年2月）
- [RFC 921 Domain Name System Implementation Schedule - Revised](https://datatracker.ietf.org/doc/html/rfc921)（1984年10月）

これらのRFCによりドメイン名への移行が進められ、すべての既存のホストは“.ARPA”というトップレベルドメインに一時的に格納されるようになりました。例えば、ホスト名“USC-ISIF”はドメイン名“USC-ISIF.ARPA”になりました。

次のファイルは1984年3月27日のHOSTS.TXT（バージョン340）です。

- [HOSTS.TXT (version 340)](https://github.com/ttkzw/hosts.txt/blob/master/pub/hosts/19840327/HOSTS.TXT)

ホストSRI-NICについては以下のように記述されています。“SRI-NIC.ARPA”というドメイン名に移行したことがわかります。

```
HOST : 10.0.0.51, 26.0.0.73 : SRI-NIC.ARPA,SRI-NIC,NIC : DEC-2060 : TOPS20 : TCP/TELNET,TCP/SMTP,TCP/TIME,TCP/FTP,TCP/ECHO,ICMP :
```

### DNSサーバーの登場

1984年にジョン・ポステル氏とポール・モカペトリス氏はUSC-ISI（University of Southern California’s Information Sciences Institute）で最初のルートサーバーを運用開始しました。このサーバーではポール・モカペトリス氏により開発されたJEEVESと名付けられたDNSサーバーのソフトウェアが動いていました。
1995年にはSRI-NIC（SRI International’s Network Information Center）でもルートサーバーが運用開始されました。

JEEVESは[TOPS-20](https://ja.wikipedia.org/wiki/TOPS-20)（[DEC PDP-10](https://ja.wikipedia.org/wiki/PDP-10)向けのOS）用に開発されたもので、そのソースコードは以下の場所で確認できます。

- [https://www.hactrn.net/hacks/jeeves/](https://www.hactrn.net/hacks/jeeves/)

JEEVESのソースコードと一緒に置いてあるv5.configというファイルには以下のように記述があり、その当時の状況を垣間見ることができます。ルートゾーンとARPA・GOV・EDU・COM・MIL・ORG・NETのトップレベルドメインのゾーンがルートサーバーとしてc.isi.eduとsri-nic.arpaで運用されていたことがわかります。

```
stat
zloadf .         in 14400 root.zone
zloadf arpa.     in 14400 arpa.zone
zloadf gov.      in 14400 gov.zone
zloadf edu.      in 14400 edu.zone
zloadf com.      in 14400 com.zone
zloadf mil.      in 14400 mil.zone
zloadf org.      in 14400 org.zone
zloadf net.      in 14400 net.zone
apref 224.0.0.0 192.0.0.0 6000 ;class C gets 6  sec ETA
apref 192.0.0.0 128.0.0.0 5000 ;class B gets 5  sec ETA
apref 128.0.0.0   0.0.0.0 4000 ;class A gets 4  sec ETA
apref 255.0.0.0  10.0.0.0 2000 ;net 10  gets 2  sec ETA
apref 255.0.0.0  26.0.0.0  500 ;net 26  gets .5 sec ETA
dserve c.isi.edu. 10.0.0.52
dserve sri-nic.arpa. 10.0.0.51 26.0.0.73
```

また、UNIX向けのDNSサーバーのソフトウェアとしてBIND（Berkeley Internet Name Domain）パッケージが開発されました。これはもともとはBSD UNIX OSのためにDARPA（米国国防高等研究計画局）の助成金を受けてカリフォルニア大学バークレー校の大学院生グループが開発したものでした。当初はカリフォルニア大学バークレー校のCSRG（Computer Systems Research Group）により保守されていました。様々な経緯があり、現在はISC（Internet Systems Consortium, Inc.）により保守されています。

- [History of the Root Server System](https://www.icann.org/en/system/files/files/rssac-023-17jun20-en.pdf)(ICANN)
- [A Brief History of the DNS and BIND](https://bind9.readthedocs.io/en/latest/history.html)(BIND 9 Administrator Reference Manual)

### ARPA以外のトップレベルドメインの登場と登録

1984年10月に、ドメイン名の運用に関する『[RFC 920 Domain Requirements](https://datatracker.ietf.org/doc/html/rfc920)』が公開されました。

- [RFC 920 Domain Requirements](https://datatracker.ietf.org/doc/html/rfc920)（1984年10月）

このRFCでは、初期のトップレベルドメインとして“GOV”、“EDU”、“COM”、“MIL”、“ORG”が定められました。さらに、2文字の国コードを用いた国別トップレベルドメインも定められ、多組織（Multiorganizations）向けのトップレベルドメインの提案もありました。

1985年1月に、初期のトップレベルドメインにおけるドメイン名の登録が開始されました。『[RFC 920 Domain Requirements](https://datatracker.ietf.org/doc/html/rfc920)』では定義されていませんでしたが、“NET”の登録も開始されました。

“COM”については1985年3月15日に“SYMBOLICS.COM”が最初のドメイン名として登録されました。その後、“BBN.COM”、“THINK.COM”と続きました。
初期に登録されたドメイン名は次のサイトで確認できます。

- [List of the oldest currently registered Internet domain names](https://en.wikipedia.org/wiki/List_of_the_oldest_currently_registered_Internet_domain_names)(Wikipedia)

次のファイルは1985年6月5日のHOSTS.TXT（バージョン456）です。

- [HOSTS.TXT (version 456)](https://github.com/ttkzw/hosts.txt/blob/master/pub/hosts/19850605/HOSTS.TXT)

次のように“YUKON.SCRC.SYMBOLICS.COM”というドメイン名が登録されているのを確認できます。

```
HOST : 192.10.41.3 : SCRC-YUKON.ARPA,SCRC-YUKON,YUKON.SCRC.SYMBOLICS.COM,YUKON : SYMBOLICS-3600 : LISPM : TCP/FINGER,TCP/FTP,TCP/SMTP,TCP/SUPDUP,TCP/TELNET,TCP/TIME,UDP/FINGER,UDP/TIME,UDP/TFTP :
```

### HOSTS.TXTのドメイン名対応

上述したようにHOSTS.TXTではすでにドメイン名が利用されていましたが、1985年10月に、HOSTS.TXTの仕様である『[RFC 810 DoD INTERNET HOST TABLE SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc810)』は『[RFC 952 DOD INTERNET HOST TABLE SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc952)』に改定され、ドメイン名に対応しました。ピリオド（.）はドメイン名のデリミタとしてのみ利用できるように改訂されました。

- [RFC 952 DOD INTERNET HOST TABLE SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc952)（1985年10月）

次のような例が示されています。

```
EXAMPLE OF HOST TABLE FORMAT

   NET : 10.0.0.0 : ARPANET :
   NET : 128.10.0.0 : PURDUE-CS-NET :
   GATEWAY : 10.0.0.77, 18.10.0.4 : MIT-GW.ARPA,MIT-GATEWAY : PDP-11 :
             MOS : IP/GW,EGP :
   HOST : 26.0.0.73, 10.0.0.51 : SRI-NIC.ARPA,SRI-NIC,NIC : DEC-2060 :
          TOPS20 :TCP/TELNET,TCP/SMTP,TCP/TIME,TCP/FTP,TCP/ECHO,ICMP :
   HOST : 10.2.0.11 : SU-TAC.ARPA,SU-TAC : C/30 : TAC : TCP :
```

### DNSの仕様変更とガイドライン

1986年1月に、DNSの運用を開始してからの仕様の更新や運用のガイドラインや問題をまとめた『[RFC 973 Domain System Changes and Observations](https://datatracker.ietf.org/doc/html/rfc973)』が公開されました。これが次のRFCの改訂につながっていきます。

- [RFC 973 Domain System Changes and Observations](https://datatracker.ietf.org/doc/html/rfc973)（1986年1月）

### MXレコード

1986年1月に、メール配送のルーティングに関する『[RFC 974 MAIL ROUTING AND THE DOMAIN SYSTEM](https://datatracker.ietf.org/doc/html/rfc974)』が公開されました。

- [RFC 974 MAIL ROUTING AND THE DOMAIN SYSTEM](https://datatracker.ietf.org/doc/html/rfc974)（1986年1月）

これによりMXリソースレコードを用いたメール配送が行われるようになりました。実は最初のSMTPの仕様である『[RFC 821 SIMPLE MAIL TRANSFER PROTOCOL](https://datatracker.ietf.org/doc/html/rfc821)』では、MXリソースレコードによるメール配送は記述されていませんでした。

## 現在のDNSへ

1987年11月に次の2個のRFCが公開されました。それぞれ『[RFC 882 DOMAIN NAMES - CONCEPTS and FACILITIES](https://datatracker.ietf.org/doc/html/rfc882)』と『[RFC 883 DOMAIN NAMES - IMPLEMENTATION and SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc883)』の改訂版です。これが現在のDNSの仕様となっており、これ以降も仕様の追加や変更はあるものの、全面的な改訂は行われていません。

- [RFC 1034 DOMAIN NAMES - CONCEPTS AND FACILITIES](https://datatracker.ietf.org/doc/html/rfc1034)（1987年11月）
- [RFC 1035 DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc1035)（1987年11月）

また、先のRFCと同時に次の運用に関するガイドラインも公開されました。

- [RFC 1032 DOMAIN ADMINISTRATORS GUIDE](https://datatracker.ietf.org/doc/html/rfc1032)（1987年11月）
- [RFC 1033 DOMAIN ADMINISTRATORS OPERATIONS GUIDE](https://datatracker.ietf.org/doc/html/rfc1033)（1987年11月）

その後の主要なDNSのRFCについての仕様追加や変更に興味のある人は『[DNSのRFCの歩き方](https://emaillab.jp/dns/dnsrfcprimer/)』をご覧ください。

### HOSTS.TXTのその後

DNSの運用へ移行した後にHOSTS.TXTファイルがどうなったかというと、1990年代半ばまでは配布されていたことは確認できています。
筆者が収集したHOSTS.TXTファイルとして一番新しいものは次の1995年5月17日のものです。

- [HOSTS.TXT (version 1425)](https://github.com/ttkzw/hosts.txt/blob/master/pub/hosts/19950517/HOSTS.TXT)

このファイルの内容を確認してもらうとわかりますが、登録されているほとんどのホストのトップレベルドメインは“MIL”です。つまり、アメリカ合衆国国防総省のネットワークで運用されていたと考えられます。

```
HOST : 192.111.116.5 : ROGERS.SUBMEPP.NAVY.MIL : COMPAQ-386 : UNIX ::
HOST : 192.112.36.5 : NIC.DDN.MIL,DIIS.DDN.MIL : SUN : UNIX : TCP/TELNET, TCP/FTP, TCP/SMTP :
HOST : 192.129.67.5 : ALEXANDRIA-EMH1.ARMY.MIL,HQAMC.ARMY.MIL, ALEXANDRIA.ARMY.MIL : PYRAMID-98X : UNIX : TCP/FTP,TCP/IP,TCP/TELNET,TCP/SMTP :
```

ちなみに、RFC 1032〜1035と同時期（1987年11月）に公開された『[RFC 1031 MILNET NAME DOMAIN TRANSITION](https://datatracker.ietf.org/doc/html/rfc1031)』ではMILNET（当時のアメリカ合衆国国防総省のネットワーク）のDNSへの移行計画について記述されており、1989年10月にホストテーブルは停止される予定と記述されています。

- [RFC 1031 MILNET NAME DOMAIN TRANSITION](https://datatracker.ietf.org/doc/html/rfc1031)（1987年11月）


## 最後に

HOSTS.TXTの話を中心にして、DNSへ移行するまでの経緯を紹介しました。
DNS関連の大規模障害が発生するたびにhostsファイルで運用すればいいという冗談が出ますが、本記事で述べたような経緯があったというわけです。

## 参考資料

- [Internet History of 1980s](https://www.computerhistory.org/internethistory/1980s/)(Computer History Museum)
- [History of the Root Server System](https://www.icann.org/en/system/files/files/rssac-023-17jun20-en.pdf)(ICANN)
- [A Brief History of the DNS and BIND](https://bind9.readthedocs.io/en/latest/history.html)(BIND 9 Administrator Reference Manual)
- [DNS RFCs](https://emaillab.jp/dns/dns-rfc/)(ttkzw's site)
- [DNSのRFCの歩き方](https://emaillab.jp/dns/dnsrfcprimer/)(ttkzw's site)
- [HOSTS.TXT](https://emaillab.jp/dns/hosts/)(ttkzw's site)
