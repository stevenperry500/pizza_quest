#!/usr/bin/env python3
"""
Simple HTTP server for testing the game locally.
Run this script and then visit http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def do_GET(self):
        # Serve index.html as default
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def run_server():
    handler = MyHttpRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Server started at http://localhost:{PORT}")
        print("Available games:")
        for html_file in [f for f in os.listdir() if f.endswith('.html')]:
            print(f"  http://localhost:{PORT}/{html_file}")
        
        # Open the minimal test version automatically
        webbrowser.open(f"http://localhost:{PORT}/minimal_test.html")
        
        httpd.serve_forever()

if __name__ == '__main__':
    run_server() 