# script properties

Nearly all modules are "script modules".  The module writes one or more scripts to divide the work load, and each script is run               
on an independent cluster node (if `pipeline.env=cluster`), or            
on an independent aws node (if `pipeline.env=aws`), or                
one at a time on the current machine (if `pipeline.env=local`).

