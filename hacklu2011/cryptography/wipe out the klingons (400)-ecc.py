def isPointOnCurve(x, y, a, b, p):
	if (x**3 + a*x + b) % p == y**2 % p:
		return 1
	else:
		return 0

def pointMultiplication(x, y, d, a, p):
	bstr_pos = lambda n: n>0 and bstr_pos(n>>1)+str(n&1) or ''
	
	binstring = bstr_pos(d)
	xtmp = x
	ytmp = y
	for c in binstring[1:]:
		#print ("%d %d"% (xtmp, ytmp))
		xtmp, ytmp = pointAddition(xtmp, ytmp, xtmp, ytmp, a, p)
		if c == "1":
			xtmp, ytmp = pointAddition(xtmp, ytmp, x, y, a, p)
	return xtmp, ytmp
	
def pointAddition(x1, y1, x2, y2, a, p):
	if x1 == "Infinity":
		return x2, y2
	elif x2 == "Infinity":
		return x1, y1
	
	#points are discrete, normalize them
	x1 = x1 % p
	y1 = y1 % p
	x2 = x2 % p
	y2 = y2 % p
	
	if x1 == x2:
		if y1 == y2:		#point doubeling
			inv = eea(2*y1, p)
			s = (3*x1**2 + a) * inv
		else:				#Adding point to its inverse
			return "Infinity", "Infinity"
	else:					#point adding
		inv = eea(x2 - x1, p)
		s = (y2 - y1)  * inv
	
	s %= p
	x3 = (s**2 - x1 - x2) % p
	y3 = (s*(x1 - x3) - y1) % p
	
	return x3, y3


def eea(a, b):
   u=t=1
   v=s=0
   while b>0:
      q=a//b
      a, b = b, a-q*b
      u, s = s, u-q*s
      v, t = t, v-q*t
   return u