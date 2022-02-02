
(define-public
	(mint
		(ids
			(list 10 (tuple (name (string-utf8 80)) (number uint) (uri (string-ascii 2048)) (mime-type (string-ascii 129)) (hash (buff 64))))))
	(contract-call? 'SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts mint-series
		tx-sender
		none
		none
		u"series"
"uri"
"mime-type"
		ids))
