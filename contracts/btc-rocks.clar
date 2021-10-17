(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-read-only (get-last-token-id)
  u50)

(define-read-only (get-token-uri (id uint))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-token-uri id)))

(define-read-only (get-owner (id uint))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-owner boom-id)))

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (match (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts transfer boom-id sender recipient)))
      success (ok success)
      error (err (get code error)))

(define-read-only (is-rock (boom-id uint))
  (is-some (index-of rocks id)))

(define-read-only (to-boom (id uint))
  (element-at rocks id))

(define-constant rocks
  (list
    5193 5201 5202 5426 5204 5203 5236 5237 5238 5239
    5240 5241 5242 5243 5244

    5245 5351 ;; #16

    5352 5439 5329 5330
    5403 5404 5405 5423 5422 5406 5459 5424 5425 5458
    5460 5461 5462 5463 5464 5536 5537 5538 5539 5540
    5541 5542 5543 5544 5545 5546 5559 5560 5593 5592
    ))
