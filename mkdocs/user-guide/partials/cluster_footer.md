

For example, the following values are used for a torque scheduler in the file: cluster.properties

```
pipeline.env=cluster
cluster.batchCommand=qsub -q copperhead
cluster.host=hpc.uncc.edu
cluster.statusCommand=qstat
```

Each project's indicidule configuration file includes           
`pipeline.defaultProps = cluster.properties`                  
