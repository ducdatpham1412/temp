from string import ascii_lowercase

# Code for classic crypto system


def get_key_value_alphabet():
    res = {}
    for index, value in enumerate(ascii_lowercase):
        res[value] = index
    return res


def calculate_modulo(n, mod):
    return n % mod


def check_included(list: list, value):
    try:
        list.index(value)
        return True
    except ValueError:
        return False


def calculate_inverse_modulo(n, mod):
    pass


"""
01. Teleportation crypto system
"""


def crypto_teleportation(string: str, k: int):
    system_standard = get_key_value_alphabet()

    def find_value(key: str):
        for k, v in enumerate(system_standard):
            if k == key:
                return v
        return None

    def find_key(value: int):
        for k, v in enumerate(system_standard):
            if v == value:
                return k
        return None

    list_characters = list(string)
    crypto_str = ''
    for character in list_characters:
        value = find_value(key=character)
        if value == None:
            raise KeyError
        crypto_number = calculate_modulo(value + k, 26)
        crypto_character = find_key(value=crypto_number)
        if not crypto_character:
            raise KeyError
        crypto_str += crypto_character

    print('Crypto string is: ', crypto_str)
    return crypto_str


"""
02. Replace crypto system
"""


def crypto_replace(string: str):
    print('First you need to set up your key table crypto system')
    print('The key input should only in ascii lowercase\n\n')
    system_standard = {}
    alphabet_selected = []
    for _, v in enumerate(ascii_lowercase):
        print('Alphabet selected: ', alphabet_selected)
        print('Do not choose character in this list')

        while True:
            chosen = input('Choose for {}: '.format(v))
            if not check_included(list=alphabet_selected, value=chosen):
                system_standard[v] = chosen
                alphabet_selected.append(chosen)
                break

    list_original_characters = list(string)
    crypto_str = ''
    for character in list_original_characters:
        crypto_str += system_standard[character]

    print('Crypto string is: ', crypto_str)
    return crypto_str


"""
03. Affine crypto system
"""


def crypto_affine(string: str):
    system_standard = get_key_value_alphabet()

    print('To enable affine crypto, yo need to specify k=(k1, k2) to be the key for crypto process')
    k1 = input('Enter k1: ')
    k2 = input('Enter k2: ')

    def find_value(key: str):
        for k, v in enumerate(system_standard):
            if k == key:
                return v
        return None

    def find_key(value: int):
        for k, v in enumerate(system_standard):
            if v == value:
                return k
        return None

    list_characters = list(string)
    crypto_str = ''
    for character in list_characters:
        value = find_value(character)
        crypto_value = calculate_modulo(int(k1)*value + int(k2), 26)
        crypto_str += find_key(crypto_value)

    print('Crypto string is: ', crypto_str)
    return crypto_str


"""
04. Vigenere crypto system
"""


def crypto_vigenere(string: str):
    system_standard = get_key_value_alphabet()

    print('To enable vigenere crypto, you need to specify m number and k string have length is n')
    m_key = input('Enter number m: ')
    m_key = int(m_key)
    while True:
        k_key = input('Enter string k: ')
        if len(k_key) == int(m_key):
            break
    k_key = list(k_key)

    def find_value(key: str):
        for k, v in enumerate(system_standard):
            if k == key:
                return v
        return None

    def find_key(value: int):
        for k, v in enumerate(system_standard):
            if v == value:
                return k
        return None

    for index, value in enumerate(k_key):
        k_key[index] = find_value(value)

    list_characters = list(string)
    crypto_str = ''
    for index, value in enumerate(list_characters):
        value_of_character = find_value(value)
        value_plus = k_key[index % m_key]
        crypto_str += find_key(value_of_character + value_plus)

    print('Crypto string is: ', crypto_str)
    return crypto_str


"""
05. Hill crypto system
"""


def crypto_hill(string: str):
    system_standard = get_key_value_alphabet()

    print('First you need to enter m key of crypto system')
    m_key = input('Enter m key: ')
    m_key = int(m_key)

    print('Next you need to enter {} x {} matrix'.format(m_key, m_key))


    def find_value(key: str):
        for k, v in enumerate(system_standard):
            if k == key:
                return v
        return None

    def find_key(value: int):
        for k, v in enumerate(system_standard):
            if v == value:
                return k
        return None

    matrix = []

    i = 0
    while i < m_key:
        temp = input('Enter column {}: '.format(i+1))
        list_number = temp.split(' ')
        for index, value in enumerate(list_number):
            list_number[index] = int(value)
        matrix.append(list_number)
        i+=1

    
    list_characters = list(string)
    crypto_str = []

    for index, value in enumerate(list_characters):
        if index%m_key==0:
            array_1 = []
            i = 0
            while i < m_key:
                array_1.append(find_value(list_characters[index + i]))
                i += 1
            
            i = 0
            while i < m_key:
                k = 0
                sum_column = 0
                while k < m_key:
                    sum_column += array_1[k] * matrix[i][k]
                    k += 1
                
                crypto_str.append(find_key(sum_column))
            

    print('Crypto string is: ', crypto_str)
    return crypto_str
