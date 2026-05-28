#!/usr/bin/env python3
"""Guarda config, cambia a openai/deepseek-v4-flash, ejecuta comando, restaura."""
import json, sys, os, subprocess, time, shutil

GLOBAL_STATE = "/home/roberto/.cline/data/globalState.json"
BACKUP = GLOBAL_STATE + ".hermes_bak"

def main():
    # 1. Backup
    shutil.copy2(GLOBAL_STATE, BACKUP)
    
    with open(GLOBAL_STATE) as f:
        cfg = json.load(f)
    
    # 2. Set openai + deepseek-v4-flash
    cfg["actModeApiProvider"] = "openai"
    cfg["planModeApiProvider"] = "openai"
    cfg["planActSeparateModelsSetting"] = True
    cfg["actModeApiModelId"] = "deepseek-v4-flash"
    cfg["planModeApiModelId"] = "deepseek-v4-flash"
    cfg["actModeOpenAiModelId"] = "deepseek-v4-flash"
    cfg["planModeOpenAiModelId"] = "deepseek-v4-flash"
    cfg["requestTimeoutMs"] = 120000  # 2 min timeout
    
    with open(GLOBAL_STATE, 'w') as f:
        json.dump(cfg, f, indent=2)
    
    # 3. Run command
    cmd = sys.argv[1:]
    if not cmd:
        print("No command provided")
        sys.exit(1)
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    # 4. Restore
    shutil.move(BACKUP, GLOBAL_STATE)
    
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
