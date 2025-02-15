import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

interface MethodObject {
  method: string;
  lambda: lambda.Function;
}

export const addMethods = (
  resource: apigateway.IResource,
  methods: MethodObject[],
  authParams: any
) => {
  methods.forEach(({ method, lambda }) => {
    resource.addMethod(method, new apigateway.LambdaIntegration(lambda), {
      ...authParams,
    });
  });
};