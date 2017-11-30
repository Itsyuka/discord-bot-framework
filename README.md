# Hidekazu's Discord Bot Framework

Built upon the Discord bot library [Eris](https://github.com/abalabahaha/eris) :)

## Features
* Command Handler
* Module Handler (w/ command support)
* Configuration files (separate for each module)

## Included Commands
```
[] = Required
() = Optional
```

Command | parameters | level
---|---|---
ping | none | anyone
prefix | [Prefix] | Administrator
setStatus | [Status] (Message) | Administrator

## Included Modules
###### Disabled by default

### Welcome Mentioning System 
Command | Parameters | Level
---|---|---
welcome.editChannel | (channel id/name) | Manage Guild
welcome.editMessage | [message] | Manage Guild
welcome.enable | | Manage Guild
welcome.disable | | Manage Guild

### Leave Notification System 
Command | Parameters | Level
---|---|---
leave.editChannel | (channel id/name) | Manage Guild
leave.editMessage | [message] | Manage Guild
leave.enable | | Manage Guild
leave.disable | | Manage Guild

### Logging System
Command | Parameters | Level
---|---|---
logging.setChannel | | Administrator
logging.enable | | Administrator
logging.disable | | Administrator

## License
Refer to the [License](LICENSE)