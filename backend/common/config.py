from autogen_agentchat.conditions import HandoffTermination, TextMentionTermination

termination_condition = HandoffTermination(target="user") | TextMentionTermination("TERMINATE")
