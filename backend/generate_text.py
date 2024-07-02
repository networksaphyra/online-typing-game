import random
from nltk.corpus import words

word_list = words.words()

def generate_random_text(word_count):
    random_words = [random.choice(word_list) for _ in range(word_count)]
    return random_words