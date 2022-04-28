(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)
(define-constant escrow (as-contract tx-sender))
(define-constant artist 'SP1B6FGZWBJK2WJHJP76C2E4AW3HA4BVAR5DGK074)
(define-constant rocks-btc-address 'SPR0X5HVH9JMJJEBPSN81S1SBAXH631CDYF7632N)

(define-non-fungible-token rescue-nft uint)

(define-map rescues uint {sender: principal, amount: uint, when: uint, transferred: bool})

(define-private (owner-of (id uint))
    (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks get-owner id))

(define-public (rescue (id uint) (amount uint))
  (let ((owner (unwrap! (unwrap! (owner-of id) err-not-found) err-not-found)))
    (asserts! (is-eq owner artist) err-not-authorized)
    (asserts! (map-insert rescues id {sender: tx-sender, amount: amount,
      when: block-height, transferred: false}) err-already-rescued)
    (stx-transfer? amount tx-sender escrow)))

(define-public (unrescue (id uint))
  (let ((details (unwrap! (map-get? rescues id) err-not-found)))
    (asserts! (> block-height (+ (get when details) u100)) err-too-early)
    (asserts! (not (get transferred details)) err-too-late)
    (map-delete rescues id)
    (as-contract (stx-transfer? (get amount details) tx-sender (get sender details)))))

(define-public (transfer-rock (id uint))
  (let ((details (unwrap! (map-get? rescues id) err-not-found))
    (sender (get sender details)))
    (asserts! (is-eq tx-sender artist) err-not-authorized)
    (try! (as-contract (stx-transfer? (get amount details) tx-sender artist)))
    (try! (nft-mint? rescue-nft id sender))
    (map-set rescues id (merge details {transferred: true}))
    (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks transfer id artist rocks-btc-address)))

(define-read-only (get-details (id uint))
  (map-get? rescues id))

(define-public (transfer (id uint) (sender principal) (recipient principal))
	(begin
		(asserts! (is-eq tx-sender sender) err-not-authorized)
		(nft-transfer? rescue-nft id sender recipient)))

(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? rescue-nft id)))

(define-read-only (get-last-token-id)
  (ok u50))

(define-read-only (get-token-uri (id uint))
  (ok (some "ipfs://Qm..")))


(define-constant err-not-authorized (err u40300))
(define-constant err-not-found (err u404))
(define-constant err-too-early (err u501))
(define-constant err-too-late (err u502))
(define-constant err-already-rescued (err u503))
