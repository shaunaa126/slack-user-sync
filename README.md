# Sync Slack Users between Two Channels

CLI to help sync users between two slack channels

## CLI

### Usage

```shell
> node dist/index.js <sourceChannel> <targetChannel>
```

### Parameters

- `<sourceChannel>`: The unique id of the slack channel to get a list of users
- `<targetChannel>`: The unique id of the slack channel to invite a list of users to

### How to use this repository

1. Clone repository
1. Copy `.env.example` to as `.env`: `> cp .env.example .env`
1. Update `SLACK_TOKEN` in the `.env`.
    ```text
    SLACK_TOKEN={YOUR_SLACK_APP_OAUTH_TOKEN}
    ```

1. Run CLI with the options you need.

    ```shell
    node dist/index.js C01RJUQRPP0 C01RGBRJ29M
    ```

## Slack API Calls and Permissions
- [create slack app](https://api.slack.com/apps)
- [node slack web-api and pagination](https://slack.dev/node-slack-sdk/web-api)
- [conversations.members](https://api.slack.com/methods/conversations.members)
  - Bot permissions needed: `channels:read`
- [conversations.invite](https://api.slack.com/methods/conversations.invite)
  - Bot permissions needed: `channels:manage`