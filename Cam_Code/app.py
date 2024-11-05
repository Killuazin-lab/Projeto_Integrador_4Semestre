from flask import Flask, render_template, Response, send_from_directory, jsonify
import cv2
import os
import time
import tkinter as tk
from tkinter import filedialog

app = Flask(__name__, template_folder='../Site_Principal/templates')

# Função para capturar a câmera
def gen_frames():  
    cap = cv2.VideoCapture(0)  # 0 indica a câmera padrão
    while True:
        success, frame = cap.read()  # Leia o frame da câmera
        if not success:
            break
        else:
            # Codifique a imagem em formato JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            # Use o 'yield' para enviar o frame para o navegador
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Função para selecionar diretório
def select_directory():
    root = tk.Tk()
    root.withdraw()
    directory = filedialog.askdirectory(title="Selecione uma pasta")
    return directory

# Rota para servir a página HTML
@app.route('/')
def index():
    return render_template('index.html')

# Rota para servir o feed de vídeo
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Rota para capturar a imagem
@app.route('/capture_image')
def capture_image():
    cap = cv2.VideoCapture(0)
    success, frame = cap.read()
    if success:
        timestamp = int(time.time())
        directory = select_directory()
        if directory:
            filename = os.path.join(directory, f"captured_{timestamp}.jpg")
            cv2.imwrite(filename, frame)
            return jsonify({"message": f"Imagem capturada: {filename}"})
        else:
            return jsonify({"message": "Nenhum diretório selecionado"}), 400
    else:
        return jsonify({"message": "Falha ao capturar a imagem"}), 500

# Rota para servir o arquivo JS
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('../Site_Principal/js', filename)

# Rota para servir o CSS
@app.route('/stylesheet/<path:filename>')
def serve_css(filename):
    return send_from_directory('../Site_Principal/stylesheet', filename)

if __name__ == '__main__':
    app.run(debug=True)
