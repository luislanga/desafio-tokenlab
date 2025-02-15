#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TokenlabBackendStack } from '../lib/backend-stack';

const app = new cdk.App();
new TokenlabBackendStack(app, 'TokenlabBackendStack', {
});