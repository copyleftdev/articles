---
title: "Log Stomping Techniques: A Quick Reference Guide"
description: "A cheat sheet outlining various log stomping techniques used by attackers to cover their tracks and how they work."
date: "2024-11-30"
tags: ["Cybersecurity", "Log Stomping", "Forensics", "Threat Analysis"]
author: "Toity the Elite Blog Writer"
---

# Log Stomping Techniques: A Cheat Sheet

## Introduction

This cheat sheet summarizes common techniques attackers use for log stomping, along with brief descriptions of how each works. Understanding these methods can help cybersecurity professionals recognize and counteract attempts to erase or alter digital evidence.

---

### **1. Log Deletion**
- **What It Is**: Complete removal of log files to eliminate all traces of activity.
- **Example Command**:
  ```bash
  rm -rf /var/log/*
  ```
- **Use Case**: Quick erasure of evidence when attackers have limited time.

---

### **2. Selective Log Editing**
- **What It Is**: Modifying specific entries to remove or alter incriminating records.
- **Example Command**:
  ```bash
  sed -i '/Unauthorized access/d' /var/log/auth.log
  ```
- **Use Case**: Concealing specific events while maintaining overall log integrity.

---

### **3. Log Flooding**
- **What It Is**: Overloading logs with irrelevant or fake data to obscure meaningful entries.
- **Example Command**:
  ```bash
  for i in {1..1000}; do echo "$(date) INFO: Fake log entry" >> /var/log/syslog; done
  ```
- **Use Case**: Making it difficult for analysts to locate key log entries.

---

### **4. Timestamp Manipulation**
- **What It Is**: Altering timestamps on log entries or log files to mislead investigators.
- **Example Command**:
  ```bash
  touch -t 202401011200 /var/log/compromised.log
  ```
- **Use Case**: Disguising the timing of an attack to avoid suspicion.

---

### **5. Log Rotation Abuse**
- **What It Is**: Forcing log rotation to overwrite or delete existing logs before backups are created.
- **Example Command**:
  ```bash
  logrotate -f /etc/logrotate.conf
  ```
- **Use Case**: Exploiting scheduled log rotation to destroy evidence.

---

### **6. Clearing Windows Event Logs**
- **What It Is**: Removing event logs on Windows systems to erase traces of activity.
- **Example Command**:
  ```powershell
  Clear-EventLog -LogName Security
  ```
- **Use Case**: Disabling event tracking on compromised Windows machines.

---

### **7. Disabling Logging Services**
- **What It Is**: Stopping or disabling logging services to prevent new logs from being created.
- **Example Command**:
  ```bash
  systemctl stop rsyslog
  ```
- **Use Case**: Halting log creation during an attack to avoid detection.

---

### **8. Remote Log Tampering**
- **What It Is**: Gaining access to centralized logging systems to alter or delete aggregated logs.
- **Example Tools**: Custom scripts or exploits targeting SIEM solutions like Splunk or Elasticsearch.
- **Use Case**: Manipulating logs stored remotely for comprehensive cover-up.

---

### **9. Log File Replacement**
- **What It Is**: Replacing original log files with fake versions that omit evidence of malicious activity.
- **Example Command**:
  ```bash
  cp /fake_log/syslog /var/log/syslog
  ```
- **Use Case**: Rewriting the narrative in logs while maintaining file integrity.

---

### **10. Encoding or Encryption Abuse**
- **What It Is**: Encoding or encrypting log entries to make them unreadable by standard tools.
- **Example Command**:
  ```bash
  openssl enc -aes-256-cbc -in /var/log/auth.log -out /var/log/auth.log.enc
  ```
- **Use Case**: Preventing easy access to logs by forensic analysts.

---

### **11. Log Injection**
- **What It Is**: Inserting fake log entries to redirect blame or create confusion.
- **Example Command**:
  ```bash
  echo "$(date) ERROR: Failed SSH login from 192.168.1.100" >> /var/log/auth.log
  ```
- **Use Case**: Framing other IPs or users as culprits.

---

### **12. Hidden Logs**
- **What It Is**: Moving logs to obscure locations or hiding them with file attributes.
- **Example Command**:
  ```bash
  mv /var/log/auth.log /tmp/.hidden_auth.log
  ```
- **Use Case**: Making logs less accessible to automated forensic tools.

---

### **13. Network Traffic Redirection**
- **What It Is**: Redirecting logs sent over the network to a different destination.
- **Example Command**:
  ```bash
  iptables -A OUTPUT -p tcp --dport 514 -j DROP
  ```
- **Use Case**: Preventing logs from reaching centralized logging servers.

---

### **14. Metadata Tampering**
- **What It Is**: Altering log file metadata to disguise modifications.
- **Example Command**:
  ```bash
  touch -r /backup/syslog /var/log/syslog
  ```
- **Use Case**: Making changes appear as part of normal operations.

---

### **15. Kernel Log Tampering**
- **What It Is**: Manipulating kernel logs to hide traces of rootkit or malware activity.
- **Example Tool**: `dmesg` for accessing and altering kernel logs.
- **Use Case**: Concealing evidence of kernel-level compromises.

---

## Conclusion

Attackers use a variety of log stomping techniques to evade detection and hinder forensic investigations. Understanding these methods allows defenders to better protect their systems, detect tampering, and respond effectively to incidents.
