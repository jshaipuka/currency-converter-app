## Overview

React app that is deployed to Amazon S3 bucket with CloudFront set up.

## Deploy

1. Install dependencies `npm i`
2. Update with ApiGateway URL and KEY.
3. Build dist `npm run build`
4. Install amd setup [https://www.serverless.com/framework/docs/providers/aws/guide/installation/](serverless)
5. Create resources in AWS via `sls deploy --stage=prod --region=us-east-1`
6. Upload dist folder to S3 such as the index.html will be uploaded at top level in the bucket.
7. Grab the CloudFront url and try out.
