/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/29 17:57:14 by kblack            #+#    #+#             */
/*   Updated: 2019/01/29 17:57:21 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// #include "ft_printf.h"

//gcc -Wall -Werror -Wextra main.c -I . -I libft libftprintf.a

int main(void)
{
	/*----------------------% TESTS---------------------*/
	// ft_printf("%5%\n");
	// ft_printf("%-5%\n");
	// ft_printf("%.0%\n");
	// ft_printf("%   %\n", "test");

	// printf("%5%\n");
	// printf("%-5%\n");
	// printf("%.0%\n");
	// printf("%   %\n");


	/*----------------------CHAR AND STRING TESTS---------------------*/
	// char *str = "this is a string";
	// char c = 'a';
	// char d = 'w';

	// printf("printf: %c%c\there<======\n", c, 65);
	// ft_printf("printf: %c%c\there<======\n", c, 65);

	// printf("----------------------\n");
	// printf("----------------------\n");

	// ft_printf("char: ->%-6c<-->%6c\n", c, d);
	// ft_printf("char: ->%6c<-->%-6c\n", c, d);

	// printf("----------------------\n");
	// printf("----------------------\n");

	// printf("char: ->%-6c<-->%6c\n", c, d);
	// printf("char: ->%6c<-->%-6c\n", c, d);

	// printf("----------------------\n");
	// printf("----------------------\n");
	// printf("----------------------\n");
	// printf("----------------------\n");

	// ft_printf("string: %s\n", str);
	// ft_printf("string: %5s\n", str);
	// ft_printf("string: %.2s\n", str);
	// ft_printf("string: %-5s\n", str);
	// ft_printf("string: %-.2s\n", str);
	// ft_printf("string: %5.2s\n", str);
	// ft_printf("string: %-5.2s\n", str);

	// printf("----------------------\n");
	// printf("----------------------\n");
	// printf("----------------------\n");
	// printf("----------------------\n");

	// printf("string: %s\n", str);
	// printf("string: %5s\n", str);
	// printf("string: %.2s\n", str);
	// printf("string: %-5s\n", str);
	// printf("string: %-.2s\n", str);
	// printf("string: %5.2s\n", str);
	// printf("string: %-5.2s\n", str);

	// ft_printf(":%s:\n", "Hello, world!");
	// ft_printf(":%15s:\n", "Hello, world!");
	// ft_printf(":%.10s:\n", "Hello, world!");
	// ft_printf(":%-10s:\n", "Hello, world!");
	// ft_printf(":%-15s:\n", "Hello, world!");
	// ft_printf(":%.15s:\n", "Hello, world!");
	// ft_printf(":%15.10s:\n", "Hello, world!");
	// ft_printf(":%-15.10s:\n", "Hello, world!");
	// ft_printf("@moulitest: %s\n", NULL);
	// ft_printf("%s %s\n", NULL, string);

	// printf("----------------------\n");
	// printf("----------------------\n");
	// printf("----------------------\n");
	// printf("----------------------\n");

	// printf(":%s:\n", "Hello, world!");
	// printf(":%15s:\n", "Hello, world!");
	// printf(":%.10s:\n", "Hello, world!");
	// printf(":%-10s:\n", "Hello, world!");
	// printf(":%-15s:\n", "Hello, world!");
	// printf(":%.15s:\n", "Hello, world!");
	// printf(":%15.10s:\n", "Hello, world!");
	// printf(":%-15.10s:\n", "Hello, world!");
	// printf("@moulitest: %s\n", NULL);
	// printf("%s %s\n", NULL, string);

	/*-----------------------UNSIGNED INTEGERS---------------------------*/
	/* Unsigned ints */
	// ft_printf("Unsigned value: %u\n", 150);
	// ft_printf("Unsigned value: %u\n", '\0');
	// ft_printf("Unsigned Integer (ft_printf): %15.0u\n", 123);
	// ft_printf("Unsigned Integer (ft_printf): %-15.0u\n", 123);
	// ft_printf("Unsigned Integer (ft_printf): %015.5u\n", 123);
	// ft_printf("Unsigned Integer (ft_printf): %15.u\n", 123);

	// printf("---------------------------------\n");

	// printf("Unsigned value: %u\n", 150);
	// printf("Unsigned value: %u\n", '\0');
	// printf("Unsigned Integer (ft_printf): %15.0u\n", 123);
	// printf("Unsigned Integer (ft_printf): %-15.0u\n", 123);
	// printf("Unsigned Integer (ft_printf): %015.5u\n", 123);
	// printf("Unsigned Integer (ft_printf): %15.u\n", 123);

	// printf("---------------------------------\n");
	// printf("---------------------------------\n");

	// /* Unsigned Hexidecimal */
	// ft_printf("Hexadecimal: %#x\n", 0);
	// ft_printf("Hexadecimal: %#8x\n", 42);
	// ft_printf("UnsignHexInt, lowercase (ft_printf): %#x\n", -2545);
	// ft_printf("UnsignHexInt, lowercase (ft_printf): %#025x\n", 2545);
	// ft_printf("UnsignHexInt, UPPERCASE (ft_printf): %#X\n", -2545);
	// ft_printf("UnsignHexInt, UPPERCASE (ft_printf): %#025X\n", 2545);
	// ft_printf("@moulitest: %#.x %#.0x\n", 0, 0);
	// ft_printf("%#8x\n", 42);

	// printf("---------------------------------\n");

	// printf("Hexadecimal: %#x\n", 0);
	// printf("Hexadecimal: %#8x\n", 42);
	// printf("UnsignHexInt, lowercase (ft_printf): %#x\n", -2545);
	// printf("UnsignHexInt, lowercase (ft_printf): %#025x\n", 2545);
	// printf("UnsignHexInt, UPPERCASE (ft_printf): %#X\n", -2545);
	// printf("UnsignHexInt, UPPERCASE (ft_printf): %#025X\n", 2545);
	// printf("@moulitest: %#.x %#.0x\n", 0, 0);
	// printf("%#8x\n", 42);

	//  Unsigned Octal 
	// ft_printf("Octal: %#o\n", 255); 
	// ft_printf("UnsignOct (ft_printf): %#o\n", 33);
	// ft_printf("UnsignOct (ft_printf): %#o\n", '\0');
	// ft_printf("%#6o\n", 2500);
	// ft_printf("@moulitest: %.o %.0o\n", 0, 0);
	// ft_printf("@moulitest: %5.o %5.0o\n", 0, 0);

	// printf("---------------------------------\n");

	// printf("Octal: %#o\n", 255);
	// printf("UnsignOct (ft_printf): %#o\n", '\0');
	// printf("UnsignOct (ft_printf): %#o\n", 33);
	// printf("%#6o\n", 2500);
	// printf("@moulitest: %.o %.0o\n", 0, 0);
	// printf("@moulitest: %5.o %5.0o\n", 0, 0);

	// /* Pointer to character */
	// char * b;
	// char *d;
	// b = "this is the first string";
	// d = "this is a string";

	// ft_printf("Pointer (printf): %p\n", d);
	// ft_printf("Pointer (ft_printf): %p\n", d);
	// ft_printf("%p\n", b);

	// printf("---------------------------------\n");

	// printf("Pointer (printf): %p\n", d);
	// printf("Pointer (ft_printf): %p\n", d);
	// printf("%p\n", b);

	/*-------------------------------SIGNED INTEGERS-----------------------------------*/

	// ft_printf("Signed Decimal (ft_printf): %d\n", 123);
	// ft_printf("Signed Decimal (ft_printf): %d\n", -123);
	// ft_printf("Signed Deciaml: %d\n",0); 
	// ft_printf("Signed Deciaml: %d\n",-7);
	// ft_printf("Signed Deciaml: %d\n",1560133635);
	// ft_printf("Signed Deciaml: %d\n",-2035065302);
	// ft_printf("Signed Deciaml (right-justified): %5d\n",0);
	// ft_printf("Signed Deciaml (right-justified): %5d\n",-7);
	// ft_printf("Signed Deciaml (right-justified): %5d\n",1560133635);
	// ft_printf("Signed Deciaml (right-justified): %5d\n",-2035065302);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",0);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",-7);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",1560133635);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",-2035065302);
	// ft_printf("Signed Deciaml (zero-fill): %05d\n",0);
	// ft_printf("Signed Deciaml (zero-fill): %05d\n",-7);
	// ft_printf("Signed Deciaml (zero-fill): %05d\n",1560133635);
	// ft_printf("Signed Deciaml (zero-fill): %05d\n",-2035065302);

	// printf("---------------------------------\n");

	// printf("Signed Decimal (ft_printf): %d\n", 123);
	// printf("Signed Decimal (ft_printf): %d\n", -123);
	// printf("Signed Deciaml: %d\n",0); 
	// printf("Signed Deciaml: %d\n",-7);
	// printf("Signed Deciaml: %d\n",1560133635);
	// printf("Signed Deciaml: %d\n",-2035065302);
	// printf("Signed Deciaml (right-justified): %5d\n",0);
	// printf("Signed Deciaml (right-justified): %5d\n",-7);
	// printf("Signed Deciaml (right-justified): %5d\n",1560133635);
	// printf("Signed Deciaml (right-justified): %5d\n",-2035065302);
	// printf("Signed Deciaml (left-justified): %-5d\n",0);
	// printf("Signed Deciaml (left-justified): %-5d\n",-7);
	// printf("Signed Deciaml (left-justified): %-5d\n",1560133635);
	// printf("Signed Deciaml (left-justified): %-5d\n",-2035065302);
	// printf("Signed Deciaml (zero-fill): %05d\n",0);
	// printf("Signed Deciaml (zero-fill): %05d\n",-7);
	// printf("Signed Deciaml (zero-fill): %05d\n",1560133635);
	// printf("Signed Deciaml (zero-fill): %05d\n",-2035065302);

	// ft_printf("-->%d<--\n", -1);
	// ft_printf("-->%d<--\n", -4242);
	// ft_printf("-->%d<--\n", 2147483648);
	// ft_printf("-->%d<--\n", -2147483648);
	// ft_printf("-->% d<--\n", 42);
	// ft_printf("-->% d<--\n", -42);
	// ft_printf("-->%+d<--\n", 42);
	// ft_printf("-->%+d<--\n", -42);
	// ft_printf("-->%+d<--\n", 0);
	// ft_printf("%+d", 4242424242424242424242);
	// ft_printf("-->% +d<--\n", 42);
	// ft_printf("-->% +d<--\n", -42);
	// ft_printf("-->%+ d<--\n", 42);
	// ft_printf("%0+5d\n", 42);
	// ft_printf("%05d\n", -42);
	// ft_printf("%0+5d\n", -42);
	// ft_printf("%4.15d\n", 42);
	// ft_printf("%.2d\n", 4242);
	// ft_printf("%.10d\n", 4242);
	// ft_printf("@moulitest: %.d %.0d\n", 0, 0);
	// ft_printf("@moulitest: %5.d %5.0d\n", 0, 0);
	// ft_printf("%+d", 0);
	// ft_printf("%hd", −32768);
	// ft_printf("%hd", −32769);

	// printf("---------------------------------\n");

	// printf("-->%d<--\n", -1);
	// printf("-->%d<--\n", -4242);
	// printf("-->%d<--\n", 2147483648);
	// printf("-->%d<--\n", -2147483648);
	// printf("-->% d<--\n", 42);
	// printf("-->% d<--\n", -42);
	// printf("-->%+d<--\n", 42);
	// printf("-->%+d<--\n", -42);
	// printf("-->%+d<--\n", 0);
	// printf("%+d", 4242424242424242424242);
	// printf("-->% +d<--\n", 42);
	// printf("-->% +d<--\n", -42);
	// printf("-->%+ d<--\n", 42);
	// printf("%0+5d\n", 42);
	// printf("%05d\n", -42);
	// printf("%0+5d\n", -42);
	// printf("%4.15d\n", 42);
	// printf("%.2d\n", 4242);
	// printf("%.10d\n", 4242);
	// printf("@moulitest: %.d %.0d\n", 0, 0);
	// printf("@moulitest: %5.d %5.0d\n", 0, 0);
	// printf("%+d", 0);
	// printf("%hd", −32768);
	// printf("%hd", −32769

	/*-------------------------------SIGNED FLOATS-----------------------------------*/

	// ft_printf("this: %-f\n", 18.3);
	// printf("this: %-f\n", 18.3);
	// ft_printf("float16   :%5f|\n",  1000.1 );
	// ft_printf("float17   :%0.1f|\n",  2000.123456789123456789 );
	// ft_printf("float18   :%0.2f|\n",  3000.123456789123456789 );
	// ft_printf("float19   :%0.10f|\n", 4000.123456789123456789 );
	// ft_printf("float20   :%0.20f|\n", -5000.123456789123456789 );
	// ft_printf("float21   :%0f|\n",    6000.123456789123456789 );
	// ft_printf("float22   :%0.f|\n",   7000.123456789123456789 );

	/*------------------------------------------------------------------*/

	// ft_printf("");                                -> ""
	// ft_printf("\\n");                             -> "\\n"
	// ft_printf("test");                            -> "test"
	// ft_printf("test\\n");                         -> "test\\n"
	// ft_printf("1234");                            -> "1234"
	// ft_printf("%%");                              -> "%"
	// ft_printf("%5%");                             -> "    %"
	// ft_printf("%-5%");                            -> "%    "
	// ft_printf("%.0%");                            -> "%"
	// ft_printf("%%", "test");                      -> "%"
	// ft_printf("%   %", "test");                   -> "%"
	// ft_printf("%x", 42);                          -> "2a"
	// ft_printf("%X", 42);                          -> "2A"
	// ft_printf("%x", 0);                           -> "0"
	// ft_printf("%X", 0);                           -> "0"
	// ft_printf("%x", -42);                         -> "ffffffd6"
	// ft_printf("%X", -42);                         -> "FFFFFFD6"
	// ft_printf("%x", 4294967296);                  -> "0"
	// ft_printf("%X", 4294967296);                  -> "0"
	// ft_printf("%x", test);                        -> "0"
	// ft_printf("%10x", 42);                        -> "        2a"
	// ft_printf("%-10x", 42);                       -> "2a        "
	// ft_printf("%lx", 4294967296);                 -> "100000000"
	// ft_printf("%llX", 4294967296);                -> "100000000"
	// ft_printf("%hx", 4294967296);                 -> "0"
	// ft_printf("%hhX", 4294967296);                -> "0"
	// ft_printf("%llx", 9223372036854775807);       -> "7fffffffffffffff"
	// ft_printf("%llx", 9223372036854775808);       -> "7fffffffffffffff"
	// ft_printf("%010x", 542);                      -> "000000021e"
	// ft_printf("%-15x", 542);                      -> "21e            "
	// ft_printf("%2x", 542);                        -> "21e"
	// ft_printf("%.2x", 5427);                      -> "1533"
	// ft_printf("%5.2x", 5427);                     -> " 1533"
	// ft_printf("%#x", 42);                         -> "0x2a"
	// ft_printf("%#llx", 9223372036854775807);      -> "0x7fffffffffffffff"
	// ft_printf("%#x", 0);                          -> "0"
	// ft_printf("%#x", 42);                         -> "0x2a"
	// ft_printf("%#X", 42);                         -> "0X2A"
	// ft_printf("%#8x", 42);                        -> "    0x2a"
	// ft_printf("%#08x", 42);                       -> "0x00002a"
	// ft_printf("%#-08x", 42);                      -> "0x2a    "
	// ft_printf("@moulitest: %#.x %#.0x", 0, 0);    -> "@moulitest:  "
	// ft_printf("@moulitest: %.x %.0x", 0, 0);      -> "@moulitest:  "
	// ft_printf("@moulitest: %5.x %5.0x", 0, 0);    -> "@moulitest:            "
	// ft_printf("%s", "abc");                       -> "abc"
	// ft_printf("%s", "this is a string");          -> "this is a string"
	// ft_printf("%s ", "this is a string");         -> "this is a string "
	// ft_printf("%s  ", "this is a string");        -> "this is a string  "
	// ft_printf("this is a %s", "string");          -> "this is a string"
	// ft_printf("%s is a string", "this");          -> "this is a string"
	// ft_printf("Line Feed %s", "\\n");             -> "Line Feed \\n"
	// ft_printf("%10s is a string", "this");        -> "      this is a string"
	// ft_printf("%.2s is a string", "this");        -> "th is a string"
	// ft_printf("%5.2s is a string", "this");       -> "   th is a string"
	// ft_printf("%10s is a string", "");            -> "           is a string"
	// ft_printf("%.2s is a string", "");            -> " is a string"
	// ft_printf("%5.2s is a string", "");           -> "      is a string"
	// ft_printf("%-10s is a string", "this");       -> "this       is a string"
	// ft_printf("%-.2s is a string", "this");       -> "th is a string"
	// ft_printf("%-5.2s is a string", "this");      -> "th    is a string"
	// ft_printf("%-10s is a string", "");           -> "           is a string"
	// ft_printf("%-.2s is a string", "");           -> " is a string"
	// ft_printf("%-5.2s is a string", "");          -> "      is a string"
	// ft_printf("%s %s", "this", "is");             -> "this is"
	// ft_printf("%s %s %s", "this", "is", "a");     -> "this is a"
	// ft_printf("%s %s %s %s", "this", "is", "a", "multi"); -> "this is a multi"
	// ft_printf("%s %s %s %s string. gg!", "this", "is", "a", "multi", "string"); -> "this is a multi string. gg!"
	// ft_printf("%s%s%s%s%s", "this", "is", "a", "multi", "string"); -> "thisisamultistring"
	// ft_printf("@moulitest: %s", NULL);            -> "@moulitest: (null)"
	// ft_printf("%.2c", NULL);                      -> "^@"
	// ft_printf("%s %s", NULL, string);             -> "(null) string"
	// ft_printf("%c", 42);                          -> "*"
	// ft_printf("%5c", 42);                         -> "    *"
	// ft_printf("%-5c", 42);                        -> "*    "
	// ft_printf("@moulitest: %c", 0);               -> "@moulitest: ^@"
	// ft_printf("%2c", 0);                          -> " ^@"
	// ft_printf("null %c and text", 0);             -> "null ^@ and text"
	// ft_printf("% c", 0);                          -> "^@"
	// ft_printf("%o", 40);                          -> "50"
	// ft_printf("%5o", 41);                         -> "   51"
	// ft_printf("%05o", 42);                        -> "00052"
	// ft_printf("%-5o", 2500);                      -> "4704 "
	// ft_printf("%#6o", 2500);                      -> " 04704"
	// ft_printf("%-#6o", 2500);                     -> "04704 "
	// ft_printf("%-05o", 2500);                     -> "4704 "
	// ft_printf("%-5.10o", 2500);                   -> "0000004704"
	// ft_printf("%-10.5o", 2500);                   -> "04704     "
	// ft_printf("@moulitest: %o", 0);               -> "@moulitest: 0"
	// ft_printf("@moulitest: %.o %.0o", 0, 0);      -> "@moulitest:  "
	// ft_printf("@moulitest: %5.o %5.0o", 0, 0);    -> "@moulitest:            "
	// ft_printf("@moulitest: %#.o %#.0o", 0, 0);    -> "@moulitest: 0 0"
	// ft_printf("@moulitest: %.10o", 42);           -> "@moulitest: 0000000052"
	// ft_printf("%d", 1);                           -> "1"
	// ft_printf("the %d", 1);                       -> "the 1"
	// ft_printf("%d is one", 1);                    -> "1 is one"
	// ft_printf("%d", -1);                          -> "-1"
	// ft_printf("%d", 4242);                        -> "4242"
	// ft_printf("%d", -4242);                       -> "-4242"
	// ft_printf("%d", 2147483647);                  -> "2147483647"
	// ft_printf("%d", 2147483648);                  -> "-2147483648"
	// ft_printf("%d", -2147483648);                 -> "-2147483648"
	// ft_printf("%d", -2147483649);                 -> "2147483647"
	// ft_printf("% d", 42);                         -> " 42"
	// ft_printf("% d", -42);                        -> "-42"
	// ft_printf("%+d", 42);                         -> "+42"
	// ft_printf("%+d", -42);                        -> "-42"
	// ft_printf("%+d", 0);                          -> "+0"
	// ft_printf("%+d", 4242424242424242424242);     -> "-1"
	// ft_printf("% +d", 42);                        -> "+42"
	// ft_printf("% +d", -42);                       -> "-42"
	// ft_printf("%+ d", 42);                        -> "+42"
	// ft_printf("%+ d", -42);                       -> "-42"
	// ft_printf("%  +d", 42);                       -> "+42"
	// ft_printf("%  +d", -42);                      -> "-42"
	// ft_printf("%+  d", 42);                       -> "+42"
	// ft_printf("%+  d", -42);                      -> "-42"
	// ft_printf("% ++d", 42);                       -> "+42"
	// ft_printf("% ++d", -42);                      -> "-42"
	// ft_printf("%++ d", 42);                       -> "+42"
	// ft_printf("%++ d", -42);                      -> "-42"
	// ft_printf("%0d", -42);                        -> "-42"
	// ft_printf("%00d", -42);                       -> "-42"
	// ft_printf("%5d", 42);                         -> "   42"
	// ft_printf("%05d", 42);                        -> "00042"
	// ft_printf("%0+5d", 42);                       -> "+0042"
	// ft_printf("%5d", -42);                        -> "  -42"
	// ft_printf("%05d", -42);                       -> "-0042"
	// ft_printf("%0+5d", -42);                      -> "-0042"
	// ft_printf("%-5d", 42);                        -> "42   "
	// ft_printf("%-05d", 42);                       -> "42   "
	// ft_printf("%-5d", -42);                       -> "-42  "
	// ft_printf("%-05d", -42);                      -> "-42  "
	// ft_printf("%hd", 32767);                      -> "32767"
	// ft_printf("%hd", −32768);                   -> "0"
	// ft_printf("%hd", 32768);                      -> "-32768"
	// ft_printf("%hd", −32769);                   -> "0"
	// ft_printf("%hhd", 127);                       -> "127"
	// ft_printf("%hhd", 128);                       -> "-128"
	// ft_printf("%hhd", -128);                      -> "-128"
	// ft_printf("%hhd", -129);                      -> "127"
	// ft_printf("%ld", 2147483647);                 -> "2147483647"
	// ft_printf("%ld", -2147483648);                -> "-2147483648"
	// ft_printf("%ld", 2147483648);                 -> "2147483648"
	// ft_printf("%ld", -2147483649);                -> "-2147483649"
	// ft_printf("%lld", 9223372036854775807);       -> "9223372036854775807"
	// ft_printf("%lld", -9223372036854775808);      -> "-9223372036854775808"
	// ft_printf("%jd", 9223372036854775807);        -> "9223372036854775807"
	// ft_printf("%jd", -9223372036854775808);       -> "-9223372036854775808"
	// ft_printf("%d", 1);                           -> "1"
	// ft_printf("%d %d", 1, -2);                    -> "1 -2"
	// ft_printf("%d %d %d", 1, -2, 33);             -> "1 -2 33"
	// ft_printf("%d %d %d %d", 1, -2, 33, 42);      -> "1 -2 33 42"
	// ft_printf("%d %d %d %d gg!", 1, -2, 33, 42, 0); -> "1 -2 33 42 gg!"
	// ft_printf("%4.15d", 42);                      -> "000000000000042"
	// ft_printf("%.2d", 4242);                      -> "4242"
	// ft_printf("%.10d", 4242);                     -> "0000004242"
	// ft_printf("%10.5d", 4242);                    -> "     04242"
	// ft_printf("%-10.5d", 4242);                   -> "04242     "
	// ft_printf("% 10.5d", 4242);                   -> "     04242"
	// ft_printf("%+10.5d", 4242);                   -> "    +04242"
	// ft_printf("%-+10.5d", 4242);                  -> "+04242    "
	// ft_printf("%03.2d", 0);                       -> " 00"
	// ft_printf("%03.2d", 1);                       -> " 01"
	// ft_printf("%03.2d", -1);                      -> "-01"
	// ft_printf("@moulitest: %.10d", -42);          -> "@moulitest: -0000000042"
	// ft_printf("@moulitest: %.d %.0d", 42, 43);    -> "@moulitest: 42 43"
	// ft_printf("@moulitest: %.d %.0d", 0, 0);      -> "@moulitest:  "
	// ft_printf("@moulitest: %5.d %5.0d", 0, 0);    -> "@moulitest:            "
	// ft_printf("%u", 0);                           -> "0"
	// ft_printf("%u", 1);                           -> "1"
	// ft_printf("%u", -1);                          -> "4294967295"
	// ft_printf("%u", 4294967295);                  -> "4294967295"
	// ft_printf("%u", 4294967296);                  -> "0"
	// ft_printf("%5u", 4294967295);                 -> "4294967295"
	// ft_printf("%15u", 4294967295);                -> "     4294967295"
	// ft_printf("%-15u", 4294967295);               -> "4294967295     "
	// ft_printf("%015u", 4294967295);               -> "000004294967295"
	// ft_printf("% u", 4294967295);                 -> "4294967295"
	// ft_printf("%+u", 4294967295);                 -> "4294967295"
	// ft_printf("%lu", 4294967295);                 -> "4294967295"
	// ft_printf("%lu", 4294967296);                 -> "4294967296"
	// ft_printf("%lu", -42);                        -> "18446744073709551574"
	// ft_printf("%llu", 4999999999);                -> "4999999999"
	// ft_printf("@moulitest: %.5u", 42);            -> "@moulitest: 00042"

	return 0;
}
