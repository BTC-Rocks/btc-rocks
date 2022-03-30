(define-constant escrow (as-contract tx-sender))
(define-constant artist 'SP1B6FGZWBJK2WJHJP76C2E4AW3HA4BVAR5DGK074)
(define-constant rocks-btc-address 'SPR0X5HVH9JMJJEBPSN81S1SBAXH631CDYF7632N)

(define-map rescues id {sender: principal, amount: uint, when: uint})

(define-private (owner-of (id uint))
  (unwrap! (unwrap!
    (contract-call? .btc-rocks get-owner id)
      err-not-found) err-not-found))

(define-public (rescue (id uint) (amount uint))
  (let ((owner (owner-of id)))
    (asserts! (is-eq owner artist) err-not-authorized)
    (asserts! (map-insert rescues id {sender: tx-sender, amount: amount,
      when: block-height, transferred: false}) err-already-rescued)
    (try! (stx-transfer? amount tx-sender escrow))))

(define-public (unrescue (id uint))
  (let (details (unwrap! (map-get? rescues id) err-not-found))
    (asserts! (> block-height (+ (get when details) u100)) err-too-early)
    (map-delete rescues id)
    (try! (as-contract (stx-transfer? amount tx-sender (get sender details))))))

(define-public (transfer-rock (id uint))
  (let (details (unwrap! (map-get? rescues id) err-not-found))
    (asserts! (is-eq tx-sender artist) err-not-authorized)
    (try! (as-contract (stx-transfer? (get amount details) tx-sender artist)))
    (map-set rescues id (merge details {transferred: true}))
    (contract-call? .btc-rocks transfer id artist rocks-btc-address)))

