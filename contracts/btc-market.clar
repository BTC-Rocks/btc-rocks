
(use-trait commission-trait .commission-trait.commission)

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
