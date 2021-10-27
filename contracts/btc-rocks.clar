(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)
(use-trait commission-trait .commission-trait.commission)

(define-read-only (get-last-token-id)
  u50)

(define-public (get-token-uri (id uint))
  (let ((boom-id (unwrap! (to-boom id) err-not-found))
    (meta (unwrap! (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-meta? id) err-not-found)))
    (ok (concat (concat (concat (concat "data:application/json,{\"version\":1,\"name\":\"" (get name meta)) "\", \"image\":\"") (get uri meta)) "\"}"))
  ))

(define-public (get-owner (id uint))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-owner boom-id)))

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (let ((boom-id (unwrap! (to-boom id) err-not-found)))
    (match (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts transfer boom-id sender recipient))
      success (ok success)
      error (err (get code error))))

(define-public (list-in-ustx (id uint) (price uint) (comm <commission-trait>))
  (begin
    (try! (transfer id tx-sender (as-contract tx-sender)))
    (print {a: "list-in-ustx", id: id})
    (map-set market id {price: price, comm: (contract-of comm), owner: tx-sender})
    (ok true)))

(define-public (unlist-in-ustx (id uint))
  (let ((owner (get owner (unwrap! (map-get? market id) err-not-found))))
    (try! (as-contract (transfer id tx-sender owner))
    (print {a: "unlist-in-ustx", id: id})
    (map-delete market id)
    (ok true))))

(define-public (buy-in-ustx (id uint) (comm <commission-trait>))
  (let ((offer (unwrap! (map-get? market id) err-not-found))
      (new-owner tx-sender))
    (asserts! (is-eq (get comm offer) (contract-of comm)) err-different-commission)
    (try! (as-contract (transfer id tx-sender new-owner)))
    (try! (stx-transfer? (get price offer) new-owner (get owner offer)))
    (try! (contract-call? comm pay id price))
    (print {a: "buy-in-ustx", id: id})
    (map-delete market id)
    (ok true)))

(define-read-only (is-rock (boom-id uint))
  (is-some (index-of rocks id)))

(define-read-only (to-boom (id uint))
  (element-at rocks id))

(define-constant rocks
  (list
    5193 5201 5202 5426 5204 5203 5236 5237 5238 5239
    5240 5241 5242 5243 5244 5351 5352 5439 5329 5330
    5403 5404 5405 5423 5422 5406 5459 5424 5425 5458
    5460 5461 5462 5463 5464 5536 5537 5538 5539 5540
    5541 5542 5543 5544 5545 5546 5559 5560 5593 5592))

(define-constant err-not-found (err u404))
(define-constant err-invalid-commission (err u500))
