# getting started

## start lightning node
[polar](https://lightningpolar.com/)を使ってlightning nodeを立ち上げてください  
その際、LNDを一台は立ち上げてください

## connect to lnd
polarの接続node情報から、`RESTホスト`、`管理者マカロン`をコピーし、index.tsに貼り付けて下さい

## start server
node js v16.13.2で動作確認しています
```sh
yarn install
yarn start
```

# apis
## hello world
疎通確認
```sh
❯ curl http://localhost:3000/
{"message":"Hello World!"}
```

## invoice作成
100 satoshi分のinvoiceを作成します
```sh
curl -X POST --data-urlencode 'value=100' http://localhost:3000/invoices | jq
{
  "data": {
    "r_hash": "Ru58Rb3av2Wbe7VgJ5ep3GmVspAzC1NkW5HeEGFXJnA=",
    "payment_request": "lnbcrt1u1p3lwf79pp5gmh8c3dam2lktxmmk4sz09afm35etv5sxv94xezmj80pqc2hyecqdqqcqzpgsp5vwnhkpl956w58cw9wy2ugz0d8vf8ldwz2459hvdn8puw39w5qkms9qyyssqh5ty2cd5f4yvxyvfy2p0xlglfcvz76jw6g5qw2h6x668ye52u2ch02rcgx8h5tvnp7kkawxvfpuzz0xz764v6wjnpvzazzrqns2qgkqp5vzuu8",
    "add_index": "5",
    "payment_addr": "Y6d7B+WmnUPhxXEVxAntOxJ/tcJVaFuxszh46JXUBbc="
  }
}
```

## invoiceの確認
作成したinvoiceを確認します  
支払いが完了すると、`settled`がtrueになります
```sh
curl http://localhost:3000/invoice/Ru58Rb3av2Wbe7VgJ5ep3GmVspAzC1NkW5HeEGFXJnA= |jq
{
  "data": {
    "memo": "",
    "r_preimage": "4sLnrFMCmp4XnTsJXwatFlPS5R1vX7ha6qSY6YHI0aI=",
    "r_hash": "Ru58Rb3av2Wbe7VgJ5ep3GmVspAzC1NkW5HeEGFXJnA=",
    "value": "100",
    "value_msat": "100000",
    "settled": false,
    "creation_date": "1677141957",
    "settle_date": "0",
    "payment_request": "lnbcrt1u1p3lwf79pp5gmh8c3dam2lktxmmk4sz09afm35etv5sxv94xezmj80pqc2hyecqdqqcqzpgsp5vwnhkpl956w58cw9wy2ugz0d8vf8ldwz2459hvdn8puw39w5qkms9qyyssqh5ty2cd5f4yvxyvfy2p0xlglfcvz76jw6g5qw2h6x668ye52u2ch02rcgx8h5tvnp7kkawxvfpuzz0xz764v6wjnpvzazzrqns2qgkqp5vzuu8",
    "description_hash": null,
    "expiry": "3600",
    "fallback_addr": "",
    "cltv_expiry": "40",
    "route_hints": [],
    "private": false,
    "add_index": "5",
    "settle_index": "0",
    "amt_paid": "0",
    "amt_paid_sat": "0",
    "amt_paid_msat": "0",
    "state": "OPEN",
    "htlcs": [],
    "features": {
      "9": {
        "name": "tlv-onion",
        "is_required": false,
        "is_known": true
      },
      "14": {
        "name": "payment-addr",
        "is_required": true,
        "is_known": true
      },
      "17": {
        "name": "multi-path-payments",
        "is_required": false,
        "is_known": true
      }
    },
    "is_keysend": false,
    "payment_addr": "Y6d7B+WmnUPhxXEVxAntOxJ/tcJVaFuxszh46JXUBbc="
  }
}
```