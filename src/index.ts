import * as core from '@actions/core'
import { Octokit } from '@octokit/rest'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token')
    const base = core.getInput('base') || 'master'
    const head = core.getInput('head', { required: true })
    const commit_message = core.getInput('commit_message') || undefined

    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
    const client = new Octokit({ auth: token })
    await client.repos.merge({
      repo,
      owner,
      base,
      head,
      commit_message,
    })
    core.info(`Success merge ${head} to ${base}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
