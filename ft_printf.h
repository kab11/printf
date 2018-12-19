/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 22:13:21 by kblack            #+#    #+#             */
/*   Updated: 2018/11/21 00:07:07 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_PRINTF_H
# define FT_PRINTF_H

# include <string.h>
# include <stdlib.h>
# include <stdio.h>
# include <unistd.h>
# include <stdarg.h>
# include "libft.h"
# include <stdint.h>
# include "get_next_line/get_next_line.h"

# define HEX "0123456789abcdef"
# define HEX_UPPER "0123456789ABCDEF" 
# define OCTAL "01234567" 

/*  
 *  The colon signifies that they are bit-field; tells how many bits each variable
 *  takes up ; and use it to load in a single 32-bit value  
*/

typedef struct pf_parse
{
    unsigned int hash: 1;
    unsigned int left: 1;
    unsigned int plus: 1;
    unsigned int space: 1;
    unsigned int zero: 1;
    unsigned int width;
    unsigned int precision;
    unsigned int length;
    unsigned int h: 1;
    unsigned int hh: 1;
    unsigned int l: 1;
    unsigned int ll: 1;
    unsigned int L: 1;
    unsigned int z: 1;
    unsigned int j: 1;
    unsigned int t: 1;
    char ctype;
} pf_token; //flag token

typedef struct pf_checks
{
    unsigned int u: 1;
    unsigned int x: 1;
    unsigned int X: 1;
    unsigned int o: 1;
    unsigned int p: 1;
} type_token; //type token


typedef struct pf_store
{
    char c;
    char *s;
} pf_field;

int ft_printf(const char *fmt, ...);

/*  ------------------------ PARSING ------------------------ */
int parse_params(const char *pf, va_list ap, pf_token *ftoken);
void get_flags(const char **pf, pf_token *ftoken);
void get_length(const char **pf, pf_token *ftoken);
void get_type(const char **pf, va_list ap, pf_token *ftoken);

/*  ------------------------ PRINT_SIGNED_INT ------------------------ */
void pf_signed(const char **pf, va_list ap, pf_token *ftoken);

/*  ------------------------ PRINT_UNSIGNED INT ------------------------ */
void pf_unsigned(const char **pf, va_list ap, pf_token *ftoken);

/*  ------------------------ PRINT_CHARS ------------------------ */
void print_chars(const char **pf, va_list ap);
void pf_char(va_list ap);

/*  ------------------------ PRINT_BONUSES ------------------------ */
//void pf_other(const char **pf, va_list ap, pf_token *ftoken);

#endif