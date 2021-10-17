(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-read-only (get-last-token-id)
  (begin
    (asserts! (is-rock id) err-no-rock)
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-last-token-id)))

(define-read-only (get-token-uri (id uint))
  (begin
    (asserts! (is-rock id) err-no-rock)
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-token-uri id)))

(define-read-only (get-owner (id uint))
  (begin
    (asserts! (is-rock id) err-no-rock)
    (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts get-owner id)))

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-rock id) err-not-found)
    (match (contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts transfer id sender recipient)))
      success (ok success)
      error (err (get code error)))

(define-read-only (is-rock (id uint))
  (is-some (index-of rocks id)))

;;
;; name related
;;
(define-data-var this-ctr tx-sender)
(define-data-var new-owner principal 'SP000000000000000000002Q6VF78)

;; only called once by the deployer
(define-public (set-contract (ctr principal))
  (begin
    (asserts! (is-eq this-ctr tx-sender) err-permission-denied)
    (var-set this-ctr ctr)))

;; transfer the name owned by the contract
(define-public (name-transfer)
  (let ((name (unwrap! (contract-call? 'SP000000000000000000002Q6VF78.bns
          resolve-principal this-contract) err-not-found)))
    (asserts! (transfer-agreed) err-no-agreement)
    (as-contract (contract-call? 'SP000000000000000000002Q6VF78.bns
      name-transfer (get namespace name) (get name name) (var-get new-owner) none))))

;; renew name
(define-public (name-renew (stx-to-burn uint))
  (let ((name (unwrap! (contract-call? 'SP000000000000000000002Q6VF78.bns
          resolve-principal this-contract) err-not-found)))
    (asserts! (renewal-agreed) err-no-agreement)
    (as-contract (contract-call? 'SP000000000000000000002Q6VF78.bns
      name-renew (get namespace name) (get name name) stx-to-burn none none))))

(define-constant err-not-found (err u404))
(define-constant err-no-agreement (err u500))

(define-constant rocks
  (list
    5193 5201 5202 5203 5204 5236 5237 5238 5239 5240
    5241 5242 5243 5244 5245 5329 5330 5351 5352 5403
    5404 5405 5406 5422 5423 5424 5425 5426 5439 5458
    5459 5460 5461 5462 5463 5464 5536 5537 5538 5539
    5540 5541 5542 5543 5544 5545 5546 5559 5560 5592
    5593))
