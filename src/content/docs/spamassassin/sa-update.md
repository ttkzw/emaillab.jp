---
title: SpamAssassinルールファイル自動更新(sa-update)
sidebar:
    order: 9
---
## 日本向けルールファイル

当サイトではsa-update用のルールの配布を試験的に行っています。

### 公開鍵の登録

公開鍵の情報は以下の通りです。鍵サーバからも取得できます。

```
$ gpg --fingerprint taki@emaillab.jp
pub   1024D/22B8A63A 2010-08-15 [満了: 2020-08-12]
                 指紋 = C72A 0457 2FA4 0973 21A0  2750 6C19 647E 22B8 A63A
uid                  Takashi Takizawa <taki@emaillab.jp>
sub   2048g/D22D0E33 2010-08-15 [満了: 2020-08-12]
```

次の手順で公開鍵をインポートします。

```
# wget http://spamassassin.emaillab.jp/updates/GPG.KEY
# sa-update --import GPG.KEY
```

### 更新方法

次のようにsa-updateを実行してください。

```
# sa-update --channel spamassassin.emaillab.jp --gpgkey 22B8A63A
```

なお、インポートした公開鍵の信用レベルを絶対的に信頼するように変更すればgpgkeyオプションは不要になりますが、各自ご判断ください。

spamdを利用しているときは、spamdを再起動させます。

```
# service spamassassin restart
```

更新がうまくいったら、定期的に実行するようにcrontabに登録してください。
