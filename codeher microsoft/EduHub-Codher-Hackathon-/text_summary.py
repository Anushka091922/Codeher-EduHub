import spacy
from spacy.lang.en.stop_words import STOP_WORDS

from heapq import nlargest


def text_summary(text):
    stopwords = list(STOP_WORDS)
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    tokens = [token.text for token in doc]
    from string import punctuation
    punctuation = punctuation + '\n'
    word_frequencies = {}
    for word in doc:
        if word.text.lower() not in stopwords:
            if word.text.lower() not in punctuation:
                if word.text not in word_frequencies.keys():
                    word_frequencies[word.text] = 1
                else:
                    word_frequencies[word.text] += 1
    max_frequency = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] = word_frequencies[word]/max_frequency
    sentence_tokens = [sent for sent in doc.sents]
    sentence_scores = {}
    for sent in sentence_tokens:
        for word in sent:
            if word.text.lower() in word_frequencies.keys():
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word.text.lower()]
                else:
                    sentence_scores[sent] += word_frequencies[word.text.lower()]
    select_length = int(len(sentence_tokens)*0.3)
    summary = nlargest(select_length, sentence_scores, key=sentence_scores.get)
    final_summary = [word.text for word in summary]
    summary = ' '.join(final_summary)
    return summary
    # print(summary)


# text = """
# There shall be equality of opportunity for all citizens in matters relating to
# employment or appointment to any office under the State.
# (2) No citizen shall, on grounds only of religion, race, caste, sex, descent,
# place of birth, residence or any of them, be ineligible for, or discriminated against
# in respect of, any employment or office under the State.
# (3) Nothing in this article shall prevent Parliament from making any law
# prescribing, in regard to a class or classes of employment or appointment to an
# office 1
# [under the Government of, or any local or other authority within, a State
# or Union territory, any requirement as to residence within that State or Union
# territory] prior to such employment or appointment.
# (4) Nothing in this article shall prevent the State from making any
# provision for the reservation of appointments or posts in favour of any
# backward class of citizens which, in the opinion of the State, is not adequately
# represented in the services under the State.
# 2
# [(4A) Nothing in this article shall prevent the State from making any
# provision for reservation 3
# [in matters of promotion, with consequential
# seniority, to any class] or classes of posts in the services under the State in
# favour of the Scheduled Castes and the Scheduled Tribes which, in the opinion
# of the State, are not adequately represented in the services under the State.]
# 4
# [(4B) Nothing in this article shall prevent the State from considering
# any unfilled vacancies of a year which are reserved for being filled up in that
# year in accordance with any provision for reservation made under clause (4) or
# clause (4A) as a separate class of vacancies to be filled up in any succeeding
# year or years and such class of vacancies shall not be considered together with
# the vacancies of the year in which they are being filled up for determining the
# ceiling of fifty per cent. reservation on total number of vacancies of that year.]
# """


# text_summary(text)
