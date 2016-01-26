#include <curl/curl.h>

#include <pwd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

#define USER "z3"
#define HOME "/home/" USER

extern char **environ;

int safe_system(char * s)
{
	int pid;
	if(pid = fork())
		return pid;

	setpgid(0, 0);
	
	/* close standard io */
	close(0);
	close(1);
	close(2);

	clearenv();
	setenv("USER","z3",1);
	setenv("PATH","/bin:/sbin",1);
	system(s);

	exit(0);
}

void sleep_kill(int pid)
{
	if(fork())
		return;

	close(0);
	close(1);
	close(2);

	sleep(30);
	kill(-pid, SIGKILL);
}

int main()
{
	CURL *curl = curl_easy_init( );

	printf("Content-Type: text/html;charset=us-ascii\n\n");
	char *q = getenv("QUERY_STRING");
	if(q == NULL || strlen(q) <= 0)
	{
		printf("<p>You must pass in some source code.</p>");
		return 1;
	}
	if(strlen(q) > 1024)
	{
		printf("<p>The source code is too long.</p>");
		return 1;
	}

	q = curl_easy_unescape(curl, q, strlen(q), NULL);

	FILE * log = fopen(HOME "/tmp/build.log", "w+");
	char * filename = tempnam("/tmp", "gcc_");
	fprintf(log, "%d IP: %s Output: %s\n", time(0), getenv("REMOTE_ADDR"), filename);
	fflush(log);
	
	chdir(HOME "/root");
	chroot(HOME "/root");

	struct passwd *passwd = getpwnam(USER);
	if(passwd == NULL)
	{
		printf("<p>User does not exist.</p>");
		return 1;
	}

	if(setuid(passwd->pw_uid) < 0)
		return 1;

	char buffer[2048];
	sprintf(buffer, "echo -n '%s' | gcc -x c -o %s -", q, filename);

	printf("Starting build...\n");

	int pid = safe_system(buffer);
	
	fprintf(log, "%d %s done.\n", time(0), filename);
	fclose(log);

	sleep_kill(pid);
	return 0;
}

