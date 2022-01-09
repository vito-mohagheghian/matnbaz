import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_QUEUE } from '../queue';
import { GithubRepositoryService } from './github-repository.service';

@Processor(GITHUB_QUEUE)
export class GithubRepositoryProcessor {
  constructor(private readonly repoService: GithubRepositoryService) {}
  private logger = new Logger(GithubRepositoryProcessor.name);

  @Process('extract')
  async extractProcess() {
    this.logger.log('Starting the extraction of repositories...');

    await this.repoService.extractAllOwners();
  }
}