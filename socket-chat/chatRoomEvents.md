| eventName | dataFormat                       | sender |
| --------- | -------------------------------- | ------ |
| register  | { name }                         | client |
| users     | {}                               | client |
| users     | [ { name }, { name }, { name } ] | server |
| message   | { sender, receiver, content }    | client |
| message   | { sender, sender, content }      | server |

