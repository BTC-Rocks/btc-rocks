(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-read-only (get-last-token-id)
  (ok u50))

(define-public (get-token-uri (id uint))
  (let ((boom-id (unwrap! (to-boom id) err-not-found))
    (meta (unwrap! (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-meta? id) err-not-found)))
    (ok (as-max-len? (concat (concat (concat (concat "data:application/json,{\"version\":1,\"name\":\"BTC Rock #"
      (unwrap! (to-str id) err-not-found))
      "\", \"image\":\"") (get uri meta)) "\"}") u256))))

(define-public (get-owner (id uint))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-owner boom-id)))

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (match (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts transfer boom-id sender recipient)
      success (ok success)
      error (err (get code error)))))

(define-read-only (is-rock (boom-id uint))
  (is-some (index-of rocks boom-id)))

(define-read-only (to-boom (id uint))
  (element-at rocks id))

(define-constant rocks
  (list
    u5193 u5201 u5202 u5426 u5204 u5203 u5236 u5237 u5238 u5239
    u5240 u5241 u5242 u5243 u5244 u5351 u5352 u5439 u5329 u5330
    u5403 u5404 u5405 u5423 u5422 u5406 u5459 u5424 u5425 u5458
    u5460 u5461 u5462 u5463 u5464 u5536 u5537 u5538 u5539 u5540
    u5541 u5542 u5543 u5544 u5545 u5546 u5559 u5560 u5593 u5592))

(define-constant err-not-found (err u404))
(define-constant err-invalid-commission (err u500))

(define-read-only (to-str (n uint))
  (element-at names n))

(define-constant names
  (list "1" "2" "3" "4" "5" "6" "7" "8" "9" "10"
    "11" "12" "13" "14" "15" "16" "17" "18" "19" "20"
    "21" "22" "23" "24" "25" "26" "27" "28" "29" "30"
    "31" "32" "33" "34" "35" "36" "37" "38" "39" "40"
    "41" "42" "43" "44" "45" "46" "47" "48" "49" "50"))
