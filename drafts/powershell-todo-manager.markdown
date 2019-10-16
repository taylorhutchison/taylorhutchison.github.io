# A Powershell Todo Manager
## For those always at the command line
### October 16th, 2019

I spend a lot of time on the command line, monitoring builds and processes. I'm able to get a lot done in one window, especially with [tmux](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/). I also use a running list of todo items to help me manage my work and personal life. I've used products from Google, Microsoft, and others to manage todo lists. Those products are great, but I don't like leaving my terminal to manage them.

I've been learning powershell recently. One of the powershell legends is [Jeff Hicks](https://jdhitsolutions.com/blog/) and has developed [a lot of powershell tools](https://github.com/jdhitsolutions?tab=repositories) including a [todo list manager called MyTasks](https://github.com/jdhitsolutions/MyTasks). So since I am always at the command line and I'm learning powershell anyway it made since to try it out.

[MyTasks](https://www.powershellgallery.com/packages/myTasks/) is in the powershell gallery so it makes installation very easy.

```powershell
Install-Module MyTasks
```

The first time you run it you need to set the path for store all your task data (everything is stored as xml on disc).

```powershell
New-Item -Path "~/Users/Taylor/Documents/" -Name "MyTasks" -ItemType "directory" 
Set-MyTaskHome -Path "~/Users/Taylor/Documents/MyTasks"
```

Now its installed and setup. The primary commands you'll use are New-MyTask, Get-MyTask, and Set-MyTask. Lets go over these.

#### New-MyTask

```powershell
New-MyTask -Name "Run Report" -Description "Generate report for finance" `
-Category Work -DueDate "10/20/2019"

New-MyTask -Name "Book Trip" -Category Personal
```

#### Get-MyTask

```powershell
Get-MyTask

ID  Name                      Description             DueDate OverDue Category     Progress
--  ----                      -----------             ------- ------- --------     --------
1   Run Report                Generate report for    10/20/19 False   Work                0
                              finance
2   Book Trip                                        10/23/19 False   Personal            0


Get-MyTask -Name "Book Trip"

ID  Name                      Description             DueDate OverDue Category     Progress
--  ----                      -----------             ------- ------- --------     --------
2   Book Trip                                        10/23/19 False   Personal            0
```

#### Set-MyTask
```powershell
Set-MyTask -Name "Book Trip" -Progress 40
Set-MyTask -Name "Run Report" -NewName "Run Finance Report" -DueDate "10/30/2019"
```

#### Benefits
Along with being available in the command line, I really like having my todo list "powershell ready" so I can manipulate it with the tools I already know. I could generate an HTML report and have my todo list be available for others to see if I so wish with:
```powershell
Get-MyTask | ConvertTo-HTML
```

Happy scripting!