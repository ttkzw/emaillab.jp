---
title: DNSControl
sidebar:
    order: 8
---

本記事ではDNS as Codeの実装の1つであるDNSControlについて紹介します。DNS as Codeについては下記記事をご覧ください。

- [DNS as Code](https://emaillab.jp/dns/dns-as-code/)

## DNSControlとは

DNSControlはStack Exchange社が開発・保守しているDNSゾーンの保守ツールです。Stack Exchange社はStack Overflow（開発者向けのQ&Aサイト）やServer Fault（システム・ネットワーク管理者向けのQ&Aサイト）の運営元として知られています。

公式サイトは次の場所です。

- https://docs.dnscontrol.org/

DNSControlの背景や経緯は以下のとおりです。

- 2016年10月：Dynへの大規模DDoS
- 2017年1月9日：ブログ記事『[How Stack Overflow plans to survive the next DNS attack](https://blog.serverfault.com/2017/01/09/surviving-the-next-dns-attack/)』
- 2017年3月14日：SREcon17 Americas『[DNSControl: A DSL for DNS as Code from StackOverflow.com](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)』
- 2017年3月14日：v0.1.0公開
- 2017年4月11日：ブログ記事『[Introducing DnsControl – “DNS as Code” has Arrived](https://blog.serverfault.com/2017/04/11/introducing-dnscontrol-dns-as-code-has-arrived/)』

DNSControlが行うことは設定ファイルに記述されたゾーンデータをAPIでDNSプロバイダーに反映させることです。

![DNSControlの概要](/dns/dnscontrol/images/dnscontrol.svg)

複数のDNSプロバイダーにも反映できます。

![複数のDNSプロバイダー](/dns/dnscontrol/images/dnscontrol-multi.svg)

対応しているマネージドDNSサービスプロバイダーは『[Providers](https://docs.dnscontrol.org/provider/akamaiedgedns)』に記載されています。日本国内のサービスプロバイダーとしてはさくらのクラウドが対応しています。

注記）さくらのクラウド対応は筆者が個人的にコミュニティーサポートとしてコントリビュートしたものです。

対応しているその他のDNSプロバイダーとしては以下のものがあります。

|プロバイダー|説明|
|---|---|
|AXFR+DDNS|ゾーンの取得にゾーン転送を、更新にDynamic Updateを利用|
|BIND|マスターファイルを更新|
|DNS-over-HTTPS|NSレコードが正しいか確認するだけの機能|
|Microsoft DNS Server on Microsoft Windows Server||
|PowerDNS||

## 設定

DNSControlの設定ファイルには次の2つがあります。

- creds.json：DNSプロバイダー設定（認証情報含む）
- dnsconfig.js：ゾーン設定

### DNSプロバイダー設定（認証情報含む）

creds.jsonの例を示します。

```json
{
  "sakuracloud": {
    "TYPE": "SAKURACLOUD",
    "access_token": "$SAKURACLOUD_ACCESS_TOKEN",
    "access_token_secret": "$SAKURACLOUD_ACCESS_TOKEN_SECRET"
  }
}
```

ここでの`sakuracloud`はDNSプロバイダーを指定する任意の名前で、`TYPE`はDNSプロバイダーのタイプ識別子です。ここではさくらのクラウドを示す`SAKUACLOUD`を指定しています。他のパラメーターは認証情報やAPIに関連するもので、DNSプロバイダーにより異なります。なお、指定する値としては`$`で始まる文字列を記述すると環境変数として認識します。

### ゾーン設定（レジストラー、DNSプロバイダー指定）

dnsconfig.jsの例を示します。

```javascript
var REG_NONE = NewRegistrar("none");
var DSP_SAKURACLOUD = NewDnsProvider("sakuracloud");
```

ゾーンの設定はJavaScriptの記法で行います。マクロとして利用できる関数や修飾子が用意されています。この例では`NewRegistrar()`にはレジストラーを指定します。なければ、`none`を指定します。`NewDnsProvider()`にはcreds.jsonに記述したDNSプロバイダーを指定します。

### ゾーン設定（ゾーンデータ）

dnsconfig.jsの例の続きです。

```javascript
D("dnsbeer.com", REG_NONE, DnsProvider(DSP_SAKURACLOUD),
  DefaultTTL(3600),
  HTTPS("@", 1, "pale-ale.dnsbeer.com.", ""),
  A("pale-ale", "192.0.2.1"),
END);
```

ゾーンは関数`D()`の引数として記述し、引数は`END`で終わります。引数として、ゾーン名（“.”で終わらない）、レジストラー、DNSプロバイダーを指定します。これ以降の引数にはリソースレコードタイプごとの修飾子を使ってリソースレコードを記述します。リソースレコードタイプによってはRDATAをそのまま記述するのではなく、要素ごとに記述します。

## DNSControlによるDNSプロバイダーへの反映の実行例

実行例からどういうことができるかを確認します。

### 変更前の状態

さくらのクラウドのコントロールパネルのDNSアプライアンスに登録したゾーンに次のリソースレコードが登録されているとします。

![](/dns/dnscontrol/images/dnscontrol-cp01.png)

### 設定内容

次の内容のdnsconfig.jsファイルを用意します。

```javascript
var REG_NONE = NewRegistrar("none");
var DSP_SAKURACLOUD = NewDnsProvider("sakuracloud");

D("dnsbeer.com", REG_NONE, DnsProvider(DSP_SAKURACLOUD),
  DefaultTTL(3600),
  HTTPS("@", 1, "pale-ale.dnsbeer.com.", ""),
  A("pale-ale", "192.0.2.1"),
END);
```

元のゾーンの状態に対して次の変更を行います。

- HTTPSレコードの追加
- pilsnerのAレコードの削除
- TTLをデフォルト値に変更

#### プレビュー

次のコマンドを実行してプレビューを行います。

```sh
dnscontrol preview
```

出力結果は次のようになりました。

![dnscontrol preview](/dns/dnscontrol/images/dnscontrol-preview.png)

プレビューでは作成、更新、削除されるリソースレコードが出力されます。さらに、構文チェックやMX/CNAMEの絶対ドメイン名チェックも行われます。

### DNSプロバイダーへの反映

次のコマンドを実行して、dnsconfig.jsに記述した内容をDNSプロバイダーのゾーンに反映させます。

```sh
dnscontrol push
```

出力結果は次のようになりました。

![dnscontrol push](/dns/dnscontrol/images/dnscontrol-push.png)

このとき、作成、更新、削除されるリソースレコードが表示され、DNSプロバイダーに反映されます。

### 反映したことの確認

次のようにDNSプロバイダーに反映されたことを確認できます。

![](/dns/dnscontrol/images/dnscontrol-cp02.png)

### ゾーンデータの取得（マスターファイル形式）

次のコマンドを実行すると、DNSプロバイダーに登録されているゾーンデータをマスターファイル形式で取得できます。

```sh
dnscontrol get-zones --format=zone DNSプロバイダー - ゾーン
```

出力結果は次のようになりました。

![dnscontrol get-zones](/dns/dnscontrol/images/dnscontrol-get-zones-zone.png)

#### ゾーンデータの取得（DNSControlの形式）

次のコマンドを実行すると、DNSプロバイダーに登録されているゾーンデータをdnsconfig.jsの形式で取得できます。

```sh
dnscontrol get-zones --format=js DNSプロバイダー - ゾーン
```

出力結果は次のようになりました。

![dnscontrol get-zonews](/dns/dnscontrol/images/dnscontrol-get-zones-js.png)

DNSControlの新規利用開始時にこのコマンドを使うとよいです。

## JavaScript DSL

JavaScriptのDSLであるため、変数や演算やマクロ関数が利用できます。

[公式サイトの例](https://docs.dnscontrol.org/getting-started/examples)から引用します。

```javascript
var addrA = IP("1.2.3.4")

var DSP_R53 = NewDnsProvider("route53_user1");

D("example.com", REG_MY_PROVIDER, DnsProvider(DSP_R53),
    A("@", addrA), // 1.2.3.4
    A("www", addrA + 1), // 1.2.3.5
END);
```

この他にも便利なマクロ関数が多く用意されています。

## プロバイダーの開発

DNSControlではプロバイダーを開発するためのドキュメントが用意されています。

- [Code Style Guide](https://docs.dnscontrol.org/developer-info/styleguide-code)
- [Writing new DNS providers](https://docs.dnscontrol.org/developer-info/writing-providers)

そのため、APIが利用できるDNSプロバイダーであればDNSControlのプロバイダーを開発できます。

実際に筆者はさくらのクラウドに対応するプロバイダーを開発しました。
次のPull Requestは筆者が作成したものです。

- https://github.com/StackExchange/dnscontrol/pull/3086


## 注意点

### リソースレコードタイプに関する補足

リソースレコードタイプに関して以下の補足があります。

- SOA：ほとんどの場合はDNSプロバイダー側で管理しているため、記述不要
- NS：変更できないDNSプロバイダーの場合は記述不要
- ALIAS：疑似リソースレコードタイプはDNSプロバイダーが対応していれば利用できる
- TXT：SPFやDMARCを利用するときには`SPF_BUILDER()`や`DMARC_BUILDER()`を利用できる
- CAA：`CAA_BUILDER()`を利用できる

ここで`SPF_BUILDER()`はSPF用のTXTレコードを生成してくれます。10 DNS lookupsのチェックもあるため、便利です。公式サイトの例から抜粋します。

```javascript
  SPF_BUILDER({
    label: "@",
    parts: [
      "v=spf1",
      "ip4:198.252.206.0/24", // ny-mail*
      "ip4:192.111.0.0/24", // co-mail*
      "include:_spf.google.com", // GSuite
      略
      "~all"
    ]
  }),
```

### フォーマッターに関する注意点

PrettierやBiomeなどのフォーマッターを利用していると次のように整形されることがあります。
DNSControlにおいては最後の引数の末尾のカンマは許容されないので、Trailing Commasの設定を`es5`にします。

```javascript
D(
  "example.com",
  REG_MY_PROVIDER,
  DnsProvider(DSP_MY_PROVIDER),
  A("@", "192.0.2.1"),
  A("foo", "192.0.2.2"),
  END, ←このカンマは許容されない
);
```

Prettier (.prettier)の設定例を示します。

```json
{
  "trailingComma": "es5"
}
```

Biome (biome.json)の設定例を示します。

```json
{
  "javascript": {
    "formatter": { "trailingCommas": "es5" }
  }
}
```




