import socket
import time
import random
import ecc
import cryptor

def readline(s):
	buffer = ""
	while 1:
		data = s.recv(1)
		if not data:
			raise Exception
		elif data == '\n':
			break
		buffer += data
	return buffer
def sendline(s, buf):
	buf += "\n"
	s.send(buf)
def readpoint(s):
	buffer = readline(s)
	buffer = buffer.split(",")
	if len(buffer) != 2:
		raise Exception
	x = buffer[0]
	y = buffer[1]
	return int(x), int(y)
def sendpoint(s, x, y):
	sendline(s, "%s,%s" %(x, y))
def readcurve(s):
	buffer = readline(s)
	buffer = buffer.split(",")
	if len(buffer) != 3:
		raise Exception
	a = buffer[0]
	b = buffer[1]
	p = buffer[2]
	return int(a), int(b), int(p)
	
ip = raw_input("Server: ")
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
s.connect((ip, 50000))

try: 
	print readline(s)
	a, b, p = readcurve(s)
	prim_x, prim_y = readpoint(s)
	readline(s)
	sendline(s, "y")
	
	d = random.randint(2, 2**56)
	client_x, client_y = ecc.pointMultiplication(prim_x, prim_y, d, a, p)
	sendpoint(s, client_x, client_y)
	server_x, server_y = readpoint(s)
	priv_x, priv_y = ecc.pointMultiplication(server_x, server_y, d, a, p)

	c = cryptor.cryptor(priv_x, priv_y, "client")
	
	print c.decrypt(readline(s))
	print c.decrypt(readline(s))
	
	while True:
		print c.decrypt(readline(s))
		msg = raw_input("Message: ")
		sendline(s, c.encrypt(msg))
except:
	pass
finally: 
	s.close()