import {
  Stack,
  StackProps,
  aws_ecs as ecs,
  aws_ssm as ssm,
} from 'aws-cdk-lib';
import { AwsLogDriver } from 'aws-cdk-lib/aws-ecs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const jwtSecret = ssm.StringParameter.valueForStringParameter(this, '/auth/jwt-secret')
    const jwtIss = ssm.StringParameter.valueForStringParameter(this, '/auth/jwt-iss')
    const jwtAud = ssm.StringParameter.valueForStringParameter(this, '/auth/jwt-aud')

    const ecsCluster = new ecs.Cluster(this, 'gratilog-frontend-cluster', {
      clusterName: 'gratilog-frontend',
    });

    const taskDef = new ecs.FargateTaskDefinition(this, 'gratilog-frontend-task-definition', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    const container = taskDef.addContainer('gratilog-frontend-container-image', {
      image: ecs.ContainerImage.fromAsset('../', {
        file: 'Dockerfile',
      }),
      logging: new AwsLogDriver({
        streamPrefix: 'gratilog-frontend',
        logRetention: RetentionDays.ONE_MONTH,
      }),
      environment: {
        JWT_SECRET: jwtSecret,
        JWT_ISS: jwtIss,
        JWT_AUD: jwtAud,
        AUTH_API_URL: "https://xgm7vzfjx6.execute-api.eu-west-1.amazonaws.com/v1/",
        GRATITUDE_API_URL: "https://j3rgm60lx7.execute-api.eu-west-1.amazonaws.com/v1/",
      }
      // healthCheck: {
      //   command: [
      //     'CMD-SHELL',
      //     'curl -f http://localhost:3000/healthcheck || exit 1',
      //   ],
      //   interval: Duration.seconds(30),
      //   timeout: Duration.seconds(10),
      //   retries: 5,
      // },
    });

    container.addPortMappings({
      containerPort: 3000,
      hostPort: 3000,
      protocol: ecs.Protocol.TCP,
    });

    const fargateService = new ecs.FargateService(this, 'gratilog-frontend-fargate-service', {
      cluster: ecsCluster,
      taskDefinition: taskDef,
      serviceName: 'gratilog-frontend-service',
      desiredCount: 1,
    });

    console.log(fargateService.serviceArn)
  }
}
