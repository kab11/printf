/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 20:26:37 by kblack            #+#    #+#             */
/*   Updated: 2018/11/14 20:33:52 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#include "ft_printf.h"
#include <stdio.h>
#include <string.h>


int main(void)
{
	char c = 'a';
	char *str = "This is a string";
	int i = 24;
	
	/* Characters */
	printf("Characters (printf): %c\t%c\n", c, 65);
	ft_printf("Characters (ft_printf): %c\t%c\n", c, 65);
	
	/* Strings */	
	printf("String (printf): %s\t", str);
	ft_printf("String (ft_printf): %s\n", str);
	
	/* Pointer to character */
	printf("Pointer (printf): %p\t", c);
	ft_printf("Pointer (ft_printf): %p\n", c);
	
	/* d & i are signed decimal integers
	 * precision is padded on the lift with zeros; default precision is 1 
	 * when 0 is printed with na explicit precision 0, the output is empty  */
	printf("d (printf): %d\t", i);
	ft_printf("d (ft_printf): %d\n", i);
	printf("hhd (printf): %hhd\t", i);	/* signed char */
	ft_printf("hhd (ft_printf): %hhd\n", i);
	printf("hd (printf): %hd\t", i);	/* short int */
	ft_printf("hd (ft_printf): %hd\n", );
	printf("ld (printf): %ld\t", 650000L);	/* long int */
	ft_printf("ld (ft_printf): %ld\n", 650000L);
	printf("lld (printf): %lld\t", i);	/*long long int */
	ft_printf("lld (ft_printf): %lld\n", i);
	
	printf("i (printf): %i\t", i);
	ft_printf("i (ft_printf): %i\n", i);
	printf("hhi (printf): %hhi\t", i);
	ft_printf("hhi (ft_printf): %hhi\n", i);
	printf("hi (printf): %hi\t", i);
	ft_printf("hi (ft_printf): %hi\n", i);
	printf("li (printf): %li\t", i);
	ft_printf("li (ft_printf): %li\n", i);
	printf("lli (printf): %lli\t", i);
	ft_printf("lli (ft_printf): %lli\n\n", i);

	/* Unsigned Octal */
	printf("o (printf): %o\t", i);
	ft_printf("o (ft_printf): %o\n", i);
	printf("hho (printf): %hho\t", i);
	ft_printf("hhi (ft_printf): %hho\n", i);
	printf("ho (printf): %ho\t", i);
	ft_printf("ho (ft_printf): %hi\n", i);
	printf("lo (printf): %lo\t", i);
	ft_printf("lo (ft_printf): %li\n", i);
	printf("llo (printf): %llo\t", i);
	ft_printf("llo (ft_printf): %llo\n\n", i);

	/* Unsigned Decimal */
	printf("u (printf): %u\t", i);
	ft_printf("u (ft_printf): %u\n", i);
	printf("hhu (printf): %hhu\t", i);
	ft_printf("hhu (ft_printf): %hhu\n", i);
	printf("hu (printf): %hu\t", i);
	ft_printf("hu (ft_printf): %hi\n", i);
	printf("lu (printf): %lu\t", i);
	ft_printf("lu (ft_printf): %lu\n", i);
	printf("llu (printf): %llu\t", i);
	ft_printf("llu (ft_printf): %llu\n\n", i);

	/* Unsigned Hexadecimal x & X notation 
	 * abcdef are used for x conversions and ABCDEF for X conversions */
	printf("x (printf): %x\t", i);
	ft_printf("x (ft_printf): %i\n", i);
	printf("hhx (printf): %hhx\t", i);
	ft_printf("hhx (ft_printf): %hhx\n", i);
	printf("hx (printf): %hx\t", i);
	ft_printf("hx (ft_printf): %hx\n", i);
	printf("lx (printf): %lx\t", i);
	ft_printf("lx (ft_printf): %lx\n", i);
	printf("llx (printf): %llx\t", i);
	ft_printf("llx (ft_printf): %llx\n\n", i);

	printf("X (printf): %X\t", i);
	ft_printf("X (ft_printf): %X\n", i);
	printf("hhX (printf): %hhX\t", i);
	ft_printf("hhX (ft_printf): %hhX\n", i);
	printf("hX (printf): %hX\t", i);
	ft_printf("hX (ft_printf): %hX\n", i);
	printf("lX (printf): %lX\t", i);
	ft_printf("lX (ft_printf): %lX\n", i);
	printf("llX (printf): %llX\t", i);
	ft_printf("llX (ft_printf): %llX\n\n", i);

	/* Decimal Floating Point */
	printf("f (printf): %f\t", );
	ft_printf("f (ft_printf): %f\n", );
	printf("lf (printf): %lf\t", );
	ft_printf("lf (ft_printf): %lf\n", );
	printf("Lf (printf): %Lf\t", );
	ft_printf("Lf (ft_printf): %Lf\n", );
	
	/* % followed by % writes a single % to the stream */
	printf("% (printf): %%\t", %);
	ft_printf("% (ft_printf): %%\n", %);

	return (0);
}
