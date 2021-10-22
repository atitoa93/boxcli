`box users`
===========

Delete pre populated content for list of users

* [`box users:delete-pre-populated-content USERID`](#box-usersdelete-pre-populated-content-userid)

## `box users:delete-pre-populated-content USERID`

Delete pre populated content for list of users

```
USAGE
  $ box users:delete-pre-populated-content USERID

ARGUMENTS
  USERID  User ID to delete their pre populated content

OPTIONS
  -f, --force                            Permanently delete the item, bypassing the trash
  -h, --help                             Show CLI help
  -q, --quiet                            Suppress any non-error output to stderr
  -s, --save                             Save report to default reports folder on disk
  -t, --token=token                      Provide a token to perform this call
  -v, --verbose                          Show verbose output, which can be helpful for debugging
  -y, --yes                              Automatically respond yes to all confirmation prompts
  --as-user=as-user                      Provide an ID for a user
  --bulk-file-path=bulk-file-path        File path to bulk .csv or .json objects
  --csv                                  Output formatted CSV
  --fields=fields                        Comma separated list of fields to show
  --json                                 Output formatted JSON
  --no-color                             Turn off colors for logging
  --save-to-file-path=save-to-file-path  Override default file path to save report

EXAMPLE
  box users:delete-pre-populated-content 22222
```

_See code: [src/commands/users/delete-pre-populated-content.js](https://github.com/box/boxcli/blob/v2.9.0/src/commands/users/delete-pre-populated-content.js)_
