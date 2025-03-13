2. Vérifier ton adresse IP locale
   Ton PC doit avoir une adresse IP sur ton réseau Wi-Fi.

Ouvre un terminal et tape la commande suivante pour connaître ton adresse IP locale :

```bash
ip a
```

Recherchez la section correspondant à ton interface réseau (souvent wlan0 pour le Wi-Fi) et note l'adresse IP. Par exemple : 192.168.1.100.


3. Configurer l'application pour écouter sur toutes les interfaces
Par défaut, les serveurs web sont configurés pour n’écouter que sur localhost (127.0.0.1), ce qui les rend accessibles uniquement sur le PC local. Change cette configuration pour écouter sur toutes les interfaces (0.0.0.0).

```javascript
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});

```


4. Configurer le pare-feu (si activé)
Ubuntu peut bloquer les connexions entrantes sur certains ports. Ajoute une règle pour ouvrir le port utilisé par ton application web.

Si tu utilises ufw :
```bash
sudo ufw allow 3000
sudo ufw reload
```

5. Lancer l'application via docker
```
docker compose up --build
```