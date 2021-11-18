(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)
(use-trait commission-trait .commission-trait.commission)

(define-constant TX_FEE_PER_ROCK u100000000)

(define-non-fungible-token rock uint)
(define-map market uint {price: uint, commission: principal})
(define-data-var number-of-rocks uint u0)
(define-map mint-address bool principal)

(define-read-only (get-last-token-id)
  (ok u50))

(define-read-only (get-number-of-rocks)
  (var-get number-of-rocks))

(define-public (get-token-uri (id uint))
  (ok (some "ipfs://Qm../{id}.json")))

(define-public (get-owner (id uint))
  (ok (nft-get-owner? rock id)))

(define-private (floor-stx-transfer (id uint))
  (match (nft-get-owner? rock id)
  rock-owner
    (if (not (is-eq tx-sender rock-owner))
      (stx-transfer? TX_FEE_PER_ROCK tx-sender rock-owner)
      (ok true))
  (ok true)))

(define-private (check-err (current (response bool uint)) (result (response bool uint)))
  (if (is-err result) result current))

(define-private (trnsfr (id uint) (sender principal) (recipient principal))
  (let ((floor-result (map floor-stx-transfer indices)))
    (try! (fold check-err floor-result (ok true)))
    (nft-transfer? rock id sender recipient)))

 ;; SIP009: Transfer token to a specified principal
(define-public (transfer (id uint) (sender principal) (recipient principal))
  (let ((owner (unwrap! (nft-get-owner? rock id) err-not-found)))
    (asserts! (or (is-eq tx-sender owner) (is-eq contract-caller owner)) err-not-authorized)
    ;; Rule: rocks can't be transferred while listed
    (asserts! (is-none (map-get? market id)) err-listing)
    (trnsfr id sender recipient)))

;; upgrade btc rock
(define-public (upgrade (id uint))
  (begin
    (asserts! (is-eq contract-caller (unwrap! (map-get? mint-address true) err-fatal)) err-not-authorized)
    (var-set number-of-rocks (+ u1 (var-get number-of-rocks)))
    (nft-mint? rock id tx-sender)))

;; can only be called once
(define-public (set-mint)
  (let ((the-mint (map-get? mint-address true)))
    (asserts! (and (is-none the-mint)
              (map-insert mint-address true contract-caller))
                err-fatal)
    (print contract-caller)
    (ok contract-caller)))

(define-constant indices
  (list
    u1 u2 u3 u4 u5 u6 u7 u8 u9 u10
    u11 u12 u13 u14 u15 u16 u17 u18 u19 u20
    u21 u22 u23 u24 u25 u26 u27 u28 u29 u30
    u31 u32 u33 u34 u35 u36 u37 u38 u39 u40
    u41 u42 u43 u44 u45 u46 u47 u48 u49 u50))


(define-private (is-sender-owner (id uint))
  (let ((owner (unwrap! (nft-get-owner? rock id) false)))
    (or (is-eq tx-sender owner) (is-eq contract-caller owner))))

(define-read-only (get-listing-in-ustx (id uint))
  (map-get? market id))

(define-public (list-in-ustx (id uint) (price uint) (comm <commission-trait>))
  (let ((listing  {price: price, commission: (contract-of comm)}))
    (asserts! (is-sender-owner id) err-not-authorized)
    (map-set market id listing)
    (print (merge listing {a: "list-in-ustx", id: id}))
    (ok true)))

(define-public (unlist-in-ustx (id uint))
  (begin
    (asserts! (is-sender-owner id) err-not-authorized)
    (map-delete market id)
    (print {a: "unlist-in-ustx", id: id})
    (ok true)))

(define-public (buy-in-ustx (id uint) (comm <commission-trait>))
  (let ((owner (unwrap! (nft-get-owner? rock id) err-not-found))
      (listing (unwrap! (map-get? market id) err-listing))
      (floor (* (var-get number-of-rocks) TX_FEE_PER_ROCK))
      (price (get price listing)))
    (asserts! (is-eq (contract-of comm) (get commission listing)) err-invalid-commission)
    (asserts! (> price floor) err-price-too-low)
    ;; Rule seller gets price minus contract floor
    (try! (stx-transfer? (- price floor) tx-sender owner))
    (try! (contract-call? comm pay id price))
    (try! (trnsfr id owner tx-sender))
    (map-delete market id)
    (print {a: "buy-in-ustx", id: id})
    (ok true)))

(define-constant err-not-authorized (err u403))
(define-constant err-not-found (err u404))
(define-constant err-invalid-commission (err u500))
(define-constant err-listing (err u501))
(define-constant err-price-too-low (err u502))
(define-constant err-fatal (err u999))
