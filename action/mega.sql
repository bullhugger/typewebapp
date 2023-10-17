SELECT * FROM (
  SELECT entry.*, mode.type AS mode_type FROM ( 
    SELECT rod.*, IF(entry.mode IS NULL, 56, entry.mode)
    AS mode, entry.qty AS qty2, entry.securities FROM rod_process_rod_detail rod LEFT JOIN rod_dividend_detail entry ON entry.mid=4 
    AND entry.cds_account=rod.cds_account 
    AND entry.status NOT IN ('pending', 'canceled') 
    WHERE rod.cdrid=34 AND rod.investor_id NOT IN ('-', '200601012511') ) entry LEFT JOIN rod_dividend_mode mode ON mode.mid=4 AND entry.mode=mode.id ) t1 /* Get only entries with option or default to mode securities/cash_securities */ WHERE mode_type IN ('cash', 'securities', 'cash_securities', 'ratio') ORDER BY cds_account 
